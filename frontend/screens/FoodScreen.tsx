import { Button, Text } from "react-native-paper";
import { StyleSheet, Platform, SafeAreaView, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
// import { Image, Camera } from "react-native-pytorch-core";

export default function FoodScreen({ navigation }) {
  async function onCapture(image: Image) {
    console.log("balls");
  }
  return (
    <View>
      <Text>Find a mole to scan</Text>
      {/* <Camera style={StyleSheet.absoluteFill} onFrame={onCapture} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
