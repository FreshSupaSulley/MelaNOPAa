import React from "react";
import { Image, ScrollView, View } from "react-native";
import { Banner, Button, Card, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Banner elevation={5} style={{ borderRadius: 10, margin: 8, marginTop: 0, marginBottom: 0 }} visible><Text variant="titleLarge" style={{ fontWeight: "bold" }}>History</Text></Banner>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
        <Image style={{ width: '100%', height: '80%' }} resizeMode="contain" source={require('../assets/history.png')} />
        {/* Look out for */}
        <View style={{ margin: 5, flex: 1, justifyContent: "space-between" }}>
          <Text variant="titleLarge" style={{ marginBottom: 10 }}>Our AI models can diagnose multiple types of skin cancer, including:</Text>
          <Card mode="outlined">
            <Card.Content>
              <Text variant="bodyMedium">Actinic keratosis, basal cell carcinoma, dermatofibroma, melanoma, nevus, pigmented benign keratosis, seborrheic keratosis, squamous cell carcinoma, and vascular lesion.</Text>
            </Card.Content>
          </Card>
          <Text style={{ marginTop: 10 }} variant="bodyMedium"><Text style={{ fontWeight: "bold" }}>Note</Text>: Any malignant diagnoses should be followed up with a medical professional.</Text>
        </View>
      </ScrollView>
      {/* Go button */}
      <Button style={{ margin: 20 }} onPress={() => {
        navigation.navigate("Main");
      }} icon="camera" mode="contained">Scan Moles</Button>
    </View>
  );
}
