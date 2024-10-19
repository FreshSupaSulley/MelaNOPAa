import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { CameraType, RNCamera } from 'react-native-camera';
import { Camera } from 'react-native-vision-camera'

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [facing, setFacing] = useState<CameraType>('back');
  const rectRef = useRef<Rect>(null);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  // Permission
  useEffect(() => {
    Camera.requestCameraPermission().then((p) =>
      setHasPermission(p === 'granted')
    )
  }, []);
  // Get image
  async function captureImage() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = cameraRef.current.takePictureAsync(options).then(e => {
        console.log("hi");
      }).catch(e => {
        // We don't care
      });
    }
  }
  // Loop
  useEffect(() => {
    let intervalId;
    if (cameraRef.current) {
      intervalId = setInterval(captureImage, 3000);
    }
  });

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
    <Camera ref={cameraRef} isActive={true} style={{ flex: 1 }} device={devices.front} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
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
    </Camera>
  );
}
