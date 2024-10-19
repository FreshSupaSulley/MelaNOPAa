import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Button, Checkbox, IconButton, MD3Colors, useTheme } from "react-native-paper";
import Svg, { Rect } from 'react-native-svg';

export default function MapScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const [checked, setChecked] = useState(false);
  const rectRef = useRef<Rect>(null);
  const theme = useTheme();
  // Route doesn't become available until rendered apparently
  useEffect(() => {
    const location = route.params?.['location'];
    const width = route.params?.['width'];
    const height = route.params?.['height'];
    console.log("Gotss " + width + " " + height);
    // Image processing
    // Update photo
    setPhoto(route.params?.['uri']);
  }, [route.params?.['uri']]);
  // Rectangle
  function updateRect(x, y, width, height) {
    if (rectRef.current) {
      // Change the properties of the Rect dynamically
      rectRef.current.setNativeProps({ x, y, width, height });
    }
  };
  // Analyze
  async function analyze() {
    async function sendImage(photo) {
      const blob = await (await fetch(photo)).blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result; // This is the base64 string
        fetch("https://fresh-corners-bake.loca.lt/freakyPics", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64data
          })
        }).then(async response => {
          if (response.ok) {
            const result = await response.json();
            alert("done");
            console.log(result);
            navigation.navigate("Results", { "image": photo, "data": result });
          } else {
            alert("An error occured");
            console.error(response.statusText);
          }
        }).catch(e => {
          console.error("uh oh", e);
        });
      };
      reader.readAsDataURL(blob);
    }
    // Call the function with the photo URL
    sendImage(photo);
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: photo }} style={{ flex: 1 }} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
        <Svg style={{ flex: 1 }} width="100%" height="100%" viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}>
          <Rect ref={rectRef} x="0" y="0" width={dimensions.width} height={dimensions.height} stroke="red" strokeWidth="2" fill="transparent" />
        </Svg>
      </ImageBackground>
      {/* Buttons */}
      <View style={{ alignItems: "center", bottom: 0, padding: 30, gap: 10, width: "100%" }}>
        <Text style={{ color: "white", textAlign: "center" }}>This program is experimental. Any malignant diagnosis should be brought to a medicial professional for proper analysis.</Text>
        <Checkbox.Item mode="android" onPress={() => { setChecked(!checked); }} label="I understand" status={checked ? 'checked' : 'unchecked'} />
        <Button style={{ width: "100%" }} disabled={!checked} icon="send" mode="contained" onPress={analyze}>Analyze</Button>
      </View>
    </View>
  );
}
