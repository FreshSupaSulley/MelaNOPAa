import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Button, Checkbox, IconButton, MD3Colors, TextInput, useTheme } from "react-native-paper";
import Svg, { Rect } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';

export default function MapScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const [checked, setChecked] = useState(false);
  const rectRef = useRef<Rect>(null);
  const theme = useTheme();
  const indentX = 10, indentY = 50;
  // Route doesn't become available until rendered apparently
  useEffect(() => {
    const location = route.params?.['location'];
    const width = route.params?.['width'];
    const height = route.params?.['height'];
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
    // Forward to loading screen
    navigation.navigate("Loading", { "image": photo });
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: photo }} style={{ flex: 1 }} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
        <Svg style={{ flex: 1 }} width="100%" height="100%" viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}>
          <Rect ref={rectRef} x={indentX} y={indentY} width={dimensions.width - indentX * 2} height={dimensions.height - indentY * 2} stroke="red" strokeWidth="2" fill="transparent" />
        </Svg>
      </ImageBackground>
      {/* Buttons */}
      <View style={{ alignItems: "center", bottom: 0, padding: 30, gap: 10, width: "100%" }}>
        <Text style={{ color: "white", textAlign: "center" }}>This program is experimental. Any malignant diagnosis should be brought to a medicial professional for proper analysis.</Text>
        <Checkbox.Item mode="android" position="leading" onPress={() => { setChecked(!checked); }} label="I understand" status={checked ? 'checked' : 'unchecked'} />
        <Button style={{ width: "100%" }} disabled={!checked} icon="send" mode="contained" onPress={analyze}>Analyze</Button>
      </View>
    </View>
  );
}
