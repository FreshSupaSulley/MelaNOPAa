import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, SectionList } from "react-native";
import { Banner, Button, Card, Icon, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import map from "../typeDescriptions";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function HistoryScreen({ navigation }) {
  const [historyData, setHistoryData] = useState([]);
  const route = useRoute();

  // On launch
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      updateHistoryData();
    });
    return unsubscribe;
  }, [navigation]);

  function updateHistoryData() {
    AsyncStorage.getItem("data").then((data) => {
      setHistoryData(data ? JSON.parse(data) : []);
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
      {historyData.length === 0 ? (
        <View style={{ margin: 20, gap: 8 }}>
          <Text style={{ fontWeight: "bold" }} variant="titleLarge">No data.</Text>
          <Text>Head to the scan screen to add entries.</Text>
          <Image style={{ width: '100%', height: 300 }} source={require('../assets/history.png')} />
        </View>
      ) : (
        <View style={{ margin: 5, flex: 1, justifyContent: "space-between" }}>
          <SectionList
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 10 }}
            sections={historyData}
            renderSectionHeader={({ section }) => {
              return (
                // Renders each album
                <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, flexDirection: "row", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10 }}>
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
                    <Text><Text style={{ fontWeight: "bold" }}>{item.percent}%</Text> confidence{Number(item.percent) >= 50 && (<Icon source="alert" color="yellow" size={24} />)}</Text>
                    <Text>{item.date}</Text>
                  </View>
                </View>
              )
            }}
          >
          </SectionList>
        </View>
      )}
    </View>
  );
}
