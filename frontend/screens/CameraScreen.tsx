import { Button, IconButton, Text } from "react-native-paper";
// import { StyleSheet, Platform, SafeAreaView, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);

// Processes each frame
function handleCameraStream(images: any) {
  const loop = async () => {
    const nextImageTensor = images.next().value;

    if (!model || !nextImageTensor) throw new Error('no model');

    model
      .detect(nextImageTensor)
      .then((predictions) => {
        drawRectangle(predictions, nextImageTensor);
      })
      .catch((err) => {
        console.log(err);
      });

    requestAnimationFrame(loop);
  };
  loop();
}

export default function CameraScreen({ navigation }) {
  // const [model, setModel] = useState<cocoSsd.ObjectDetection>();
  let context = useRef<CanvasRenderingContext2D>();
  const canvas = useRef<Canvas>();
  const [facing, setFacing] = useState<CameraType>('back');

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Enable camera permissions to scan.</Text>
        <Button style={{ margin: 20 }} onPress={requestPermission} icon="camera" mode="contained">Enable Camera</Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    // setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      // await tf.ready();
      // setModel(await cocoSsd.load());
    })();
  }, []);
  
  return (
    <>
      <TensorCamera
        // Standard Camera props
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        // Tensor related props
        cameraTextureHeight={1920}
        cameraTextureWidth={1080}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <IconButton style={{ margin: 8 }} mode="outlined" icon={() => <MaterialIcons name="flip-camera-ios" size={24} color="white" />} size={24} onPress={toggleCameraFacing} />
    </>
    // <CameraView active autofocus="on" enableTorch style={{ flex: 1 }} facing={facing}>
    //   <IconButton style={{ margin: 8 }} mode="outlined" icon={() => <MaterialIcons name="flip-camera-ios" size={24} color="white" />} size={24} onPress={toggleCameraFacing} />
    // </CameraView>
  );
}
