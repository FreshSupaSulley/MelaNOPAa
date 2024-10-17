import { Button, IconButton, Text } from "react-native-paper";
// import { StyleSheet, Platform, SafeAreaView, View } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView active autofocus="on" enableTorch style={{ flex: 1 }} facing={facing}>
      <IconButton style={{ margin: 8 }} containerColor="black" mode="contained" icon={() => <MaterialIcons name="flip-camera-ios" size={24} color="white" />} size={24} onPress={toggleCameraFacing} />
      <IconButton style={{ margin: 8 }} containerColor="black" mode="contained" icon={() => <MaterialIcons name="flip-camera-ios" size={24} color="white" />} size={24} onPress={toggleCameraFacing} />
    </CameraView>
  );
}
