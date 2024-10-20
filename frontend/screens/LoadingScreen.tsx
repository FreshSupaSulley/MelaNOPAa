import React, { useEffect, useState } from "react";
import { Button, Text, Card, Banner, ActivityIndicator } from "react-native-paper";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function MapScreen({ navigation }) {
  const route = useRoute();
  // Receive data
  useEffect(() => {
    const image = route.params?.['image'];
    // Process
    callAPI(image);
  }, [route.params]);
  // Make the call
  async function callAPI(image) {
    console.log("Fetching");
    const blob = await (await fetch(image)).blob();
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;
      fetch("https://proud-paws-mix.loca.lt/freakyPics", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64data
        })
      }).then(async response => {
        if (response.ok) {
          console.log("Done");
          const result = await response.json();
          // Store to history
          // Send to results
          navigation.navigate("Results", { "image": image, "data": result });
        } else if(response.status == 502) {
          callAPI(image);
        } else {
          navigation.goBack();
          throw response;
        }
      }).catch(e => {
        console.log("Failed");
        console.log(e);
      }).finally(() => {
        console.log("Complete");
      });
    };
    reader.readAsDataURL(blob);
  }

  return (
    <View style={{ gap: 10, margin: 10, flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold" }} variant="titleLarge">Processing...</Text>
      <Text style={{ marginVertical: 15, margin: 50, textAlign: "center" }}>Our AI model is processing your image.</Text>
      <ActivityIndicator size={"large"} />
    </View>
  );
}
