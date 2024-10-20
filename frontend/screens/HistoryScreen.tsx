import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, SectionList } from "react-native";
import { Banner, Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MapScreen({ navigation }) {
  let histData = [];
  useEffect(() => {
    updateHistoryData();
  }, []);

  function updateHistoryData() {
    AsyncStorage.getItem("data").then((data) => {
      histData = JSON.parse(data);
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
          style={{
            maxHeight: 200,
            marginBottom: 10,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "black",
          }}
          sections={histData}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignSelf: "center",
                    alignItems: "center",
                    gap: 30,
                  }}
                >
                  <Image
                    style={{ height: 100, width: undefined, aspectRatio: 1 }}
                    resizeMode="cover"
                    source={{ uri: JSON.parse(item.data)[0].image }}
                  />
                  {/* Vertical */}
                  <View style={{ gap: 4 }}>
                    <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                      {histData[index].title}
                    </Text>
                  </View>
                </View>
                {/* Select button */}
              </View>
            );
          }}
        ></SectionList>
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
