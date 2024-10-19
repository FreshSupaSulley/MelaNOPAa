import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import Svg, { Rect } from 'react-native-svg';

export default function MapScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const rectRef = useRef<Rect>(null);
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
  
  function updateRect(x, y, width, height) {
    if (rectRef.current) {
      // Change the properties of the Rect dynamically
      rectRef.current.setNativeProps({ x, y, width, height });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: photo }} style={{ flex: 1 }} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
        <Svg style={{ flex: 1, zIndex: 100000 }} width="100%" height="100%" viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}>
          <Rect ref={rectRef} x="0" y="0" width={dimensions.width} height={dimensions.height} stroke="red" strokeWidth="2" fill="transparent" />
        </Svg>
      </ImageBackground>
    </View>
  );
}
