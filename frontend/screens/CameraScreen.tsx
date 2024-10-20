import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { default as React, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [permission, requestPermission] = useCameraPermissions();
  // Spin
  useEffect(() => {
    // Start spinning endlessly with linear easing
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Spin from 0 to 360 degrees
  });

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

  // Take pic
  function takePicture() {
    // Animate circle
    Animated.timing(fadeAnim, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // After overshooting, settle back to 1
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
    if (cameraRef.current) {
      console.log("Got picture");
      cameraRef.current.takePictureAsync().then(async picture => {
        console.log(picture);
        let factor = 2;
        let newWidth = picture.width / factor;
        let newHeight = picture.height / factor;
        // Crop
        const croppedImage = await ImageManipulator.manipulateAsync(picture.uri,
          [{ crop: { originX: newWidth / factor, originY: newHeight / factor + newHeight / 3, width: newWidth, height: newHeight - (newHeight / 3) * 2 } }],
          { format: ImageManipulator.SaveFormat.JPEG }
        );
        // Send to processing
        navigation.navigate("Processing", croppedImage);
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1, useNativeDriver: true,
          }).start();
        }, 3000);
      });
    }
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView autofocus='on' ref={cameraRef} style={{ flex: 1 }} facing={facing}>
      {/* Centered text */}
      <Animated.View style={{ position: "absolute", flex: 1, opacity: fadeAnim, top: 0, left: 0, right: 0 }}>
        <View style={{ top: 10, left: 0, right: 0 }}>
          <Text style={{ color: "white", textAlign: "center", margin: 30 }}>Align a mole in the circle.</Text>
        </View>
      </Animated.View>
      {/* Crosshair */}
      <Animated.View style={{ flex: 1, transform: [{ scale: fadeAnim }, { rotate: spin }] }}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}>
          <Circle cx={dimensions.width / 2} cy={dimensions.height / 2} r="100" stroke="white" strokeDasharray={4} strokeWidth="1" fill="transparent" />
        </Svg>
      </Animated.View>
      <View style={{ position: "absolute", bottom: 10, left: 0, right: 0, alignItems: "center" }} onLayout={(e) => setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {/* Capture button */}
          <IconButton style={{ margin: 14, borderColor: "white" }} mode="outlined" icon={() => <MaterialIcons name="circle" size={60} color="white" />} size={48} onPress={takePicture} />
          {/* Flip button */}
          <IconButton style={{ position: "absolute", left: 150 }} mode="outlined" icon={() => <MaterialIcons name="loop" size={24} color="white" />} size={30} onPress={toggleCameraFacing} />
        </View>
      </View>
    </CameraView>
  );
}