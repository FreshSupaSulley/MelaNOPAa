import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Dimensions, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const rectRef = useRef<Rect>(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ alignItems: "center", alignContent: "center", flex: 1 }}>
        <Text>Enable camera permission to scan.</Text>
        <Button style={{ margin: 20 }} onPress={requestPermission} icon="camera" mode="contained">Enable Camera</Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function updateRect(x, y, width, height) {
    if (rectRef.current) {
      // Change the properties of the Rect dynamically
      rectRef.current.setNativeProps({ x, y, width, height });
    }
  };

  return (
    <CameraView style={{ flex: 1 }} facing={facing} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
      {/* Canvas */}
      <Svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}>
        <Rect ref={rectRef} x="0" y="0" width={dimensions.width} height={dimensions.height} stroke="red" strokeWidth="2" fill="transparent" />
      </Svg>
      {/* Camera control */}
      <View style={{ position: "absolute", bottom: 10, left: 0, right: 0, alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {/* Capture button */}
          <IconButton style={{ margin: 14, borderColor: "white" }} mode="outlined" icon={() => <MaterialIcons name="circle" size={60} color="white" />} size={48} onPress={toggleCameraFacing} />
          {/* Flip button */}
          <IconButton style={{ position: "absolute", left: 150 }} mode="outlined" icon={() => <MaterialIcons name="loop" size={24} color="white" />} size={30} onPress={toggleCameraFacing} />
        </View>
      </View>
    </CameraView>
  );
}
