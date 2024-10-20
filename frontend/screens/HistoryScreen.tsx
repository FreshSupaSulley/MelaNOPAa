import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, SectionList } from "react-native";
import { Banner, Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import map from "../typeDescriptions";

export default function MapScreen({ navigation }) {
  const [histData, setHistData] = useState([]);
  useEffect(() => {
    updateHistoryData();
  }, []);

  function updateHistoryData() {
    AsyncStorage.getItem("data").then((data) => {
      setHistData(JSON.parse(data));
      console.log(histData);
      console.log(histData.length);
    });
  }

  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Banner
        elevation={5}
        style={{ borderRadius: 10, margin: 8, marginTop: 0, marginBottom: 0 }}
        visible
      >
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          History
        </Text>
      </Banner>
      <View style={{ margin: 5, flex: 1, justifyContent: "space-between" }}>
      <SectionList
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 200, marginBottom: 10, borderRadius: 10, borderColor: "grey", borderWidth: 0.5 }}
        sections={histData}
        renderSectionHeader={({ section }) => {
          return (
            // Renders each album
            <View style={{ alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, flexDirection: "row", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10 }}>
              <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>{section.title}</Text>, {section.data.length} entr{section.data.length === 1 ? "y" : "ies"}</Text>
            </View>
          )
        }}
        renderItem={({ item, index }) => {
          return (
            // Renders each image in data
            <View style={{ margin: 10, flexDirection: "row", alignItems: 'center', gap: 30 }}>
              <Image style={{ borderRadius: 10, height: 100, width: undefined, aspectRatio: 1 }} resizeMode="cover" source={{ uri: item.image }} />
              {/* Vertical */}
              <View style={{ gap: 10, flexShrink: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{map[item.index].title}</Text>
                <Text><Text style={{ fontWeight: "bold" }}>{item.percent}%</Text> confidence</Text>
                <Text>{item.date}</Text>
              </View>
            </View>
          )
        }}
      >
      </SectionList>
      </View>
      {/* Go button */}
      <Button
        style={{ margin: 20 }}
        onPress={() => {
          navigation.navigate("Main");
        }}
        icon="camera"
        mode="contained"
      >
        Scan Moles
      </Button>
    </View>
  );
}
