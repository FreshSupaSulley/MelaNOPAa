import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Image, Modal, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button, Card, DataTable, Icon, IconButton, RadioButton, Text, TextInput } from "react-native-paper";

export default function ResultsScreen({ navigation }) {
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const [cancerData, setCancerData] = useState([0]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [risk, setRisk] = useState("");
  const [potentialType, setPotentialType] = useState("");
  const [riskColor, setRiskColor] = useState("white");
  const [modalVisible, setModalVisible] = useState(false);
  const [historyText, setHistoryText] = useState("");
  const [checked, setChecked] = React.useState('first');
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Image processing
    // Update photo
    setPhoto(route.params?.['image']);
    setCancerData(route.params?.['data'].data);
    calculateRisks(route.params?.['data'].data);
    // Update history data for section list
    updateHistoryData();
  }, [route.params]);

  function updateHistoryData() {
    // Fetch data
    AsyncStorage.getItem("data").then((data) => {
      console.log(data);
      setHistoryData(data === null ? [] : JSON.parse(data));
    });
  }

  function findColor(risk) {
    // Get constant to multiply by
    let ratio = risk / 100;
    // Calculating RGB values
    let red = ((210 - 75) * ratio) + 75;
    let green = (210 - 75) * (1 - ratio) + 75;
    // Set color state
    setRiskColor(`rgb(${red}, ${green}, 75)`);
  }

  async function saveModal() {
    // Save new entry
    await AsyncStorage.setItem(
      'data',
      JSON.stringify([...historyData,
      {
        title: historyText,
        data: [{
          image: photo,
          date: new Date().toLocaleDateString(),
          index: cancerData.indexOf(Math.max(...cancerData)),
          percent: risk
        }]
      }
      ]),
    );
    setModalVisible(false);
    navigation.navigate("CameraScreen");
  }

  async function saveOption(section) {
    // Put into another entry
    section.data.push({
      image: photo,
      date: new Date().toLocaleDateString(),
      index: cancerData.indexOf(Math.max(...cancerData)),
      percent: risk
    });
    await AsyncStorage.setItem(
      'data',
      JSON.stringify(historyData),
    );
    setModalVisible(false);
    navigation.navigate("CameraScreen");
  }

  function calculateRisks(cancerData) {
    /* Determine most likely type of condition */
    let indexOfMax = cancerData.indexOf(Math.max(...cancerData))
    let potentialType;
    switch (indexOfMax) {
      case 0:
        setPotentialType("Actinic Keratoses and Intraepithelial Carcinomae (Cancerous)");
        break;
      case 1:
        setPotentialType("Basal Cell Carcinoma (Cancerous");
        break;
      case 2:
        setPotentialType("Benign Keratosis-like Lesions (Non-Cancerous)");
        break;
      case 3:
        setPotentialType("Dermatofibroma (Non-Cancerous)");
        break;
      case 4:
        setPotentialType("Melanocytic Nevi (Non-Cancerous)");
        break;
      case 5:
        setPotentialType("Pyogenic Granulomas and Hemorrhage (Can lead to Cancer)");
        break;
      case 6:
        setPotentialType("Melanoma (Cancerous)");
        break;
    }

    let riskCalc = ((cancerData[0] + cancerData[1] + cancerData[5] + cancerData[6]) * 100).toFixed(2);

    setRisk(((cancerData[0] + cancerData[1] + cancerData[5] + cancerData[6]) * 100).toFixed(2));

    findColor(riskCalc);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 0 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground style={{ flex: 1, width: '100%', height: 400 }} resizeMode="cover" source={{ uri: photo }}>
            <View style={{ position: "absolute", padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', flex: 1, bottom: 0 }}>
              <Text style={styles.title}>
                Skin Cancer Risk:<Text style={{ fontSize: 23, fontWeight: 'bold', paddingBottom: 10, color: riskColor }}> {risk}%.</Text>
              </Text>
              <Text variant="titleSmall">
                {potentialType}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.moretitle}>
                More Details
              </Text>
              <IconButton
                icon={isCollapsed ? 'chevron-down' : 'chevron-up'}
                size={24}
                style={{ marginLeft: 'auto' }}
                onPress={() => setIsCollapsed(!isCollapsed)}
              />
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={isCollapsed}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Actinic Keratosis Intraepithelial Carcinoma (Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[0] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Basal Cell Carcinoma (Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[1] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Benign Keratosis-Like Lesion (Non-Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[2] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Dermatofibroma (Non-Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[3] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Melanocytic Nevi (Non-Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[4] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Pyogenic Granulomas and Hemorrhage (Can lead to Cancer):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[5] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Melanoma (Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((cancerData[6] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Collapsible>

        </Card>
        {/* Save modal */}
        <Modal
          animationType="slide"
          visible={modalVisible}
          onShow={() => updateHistoryData()}
        >
          <SafeAreaView>
            <Button textColor='white' style={{ width: 100, margin: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} mode="contained" onPress={() => setModalVisible(false)}>Cancel</Button>
            <View style={{ padding: 10, paddingTop: 50, gap: 10 }}>
              <Text variant="titleLarge" style={{ fontWeight: "bold", color: "black", textAlign: "center" }}>Save the mole for tracking.</Text>
              <Text variant="bodyMedium" style={{ color: "black", textAlign: "center" }}>All information remains secure on your phone.</Text>
              <Card style={[styles.card, { margin: 0, paddingTop: 6 }]}>
                {/* Hide if data is not here */}
                {historyData.length > 0 &&
                  <View>
                    <Text variant="bodyLarge" style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}>Add to existing mole</Text>
                    {/* Inputs */}
                    <SectionList
                      showsVerticalScrollIndicator={false}
                      style={{ maxHeight: 200, marginBottom: 10, borderRadius: 10, borderColor: "grey", borderWidth: 0.5 }}
                      sections={historyData}
                      renderSectionHeader={({ section }) => {
                        return (
                          // Renders each album
                          <View style={{ alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, flexDirection: "row", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10 }}>
                            <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>{section.title}</Text>, {section.data.length} entr{section.data.length === 1 ? "y" : "ies"}</Text>
                            <Button textColor="white" style={{ marginVertical: 6 }} mode="outlined" onPress={() => saveOption(section)}>Select</Button>
                          </View>
                        )
                      }}
                      renderItem={({ item, index }) => {
                        return (
                          // Renders each image in data
                          <View style={{ margin: 10 }}>
                            <View style={{ flexDirection: "row", flex: 1, alignSelf: "center", alignItems: 'center', gap: 30 }}>
                              <Image style={{ borderRadius: 10, height: 100, width: undefined, aspectRatio: 1 }} resizeMode="cover" source={{ uri: item.image }} />
                              {/* Vertical */}
                              <View style={{ gap: 4 }}>
                                <Text>{item.date}</Text>
                                <Text>{item.index}</Text>
                                <Text><Text style={{ fontWeight: "bold" }}>{item.percent}%</Text> confidence</Text>
                              </View>
                            </View>
                          </View>
                        )
                      }}
                    >
                    </SectionList>
                  </View>
                }
                {/* Custom text */}
                <Text variant="bodyLarge" style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}>Create entry</Text>
                <TextInput value={historyText} onChangeText={text => setHistoryText(text)} placeholder="Mole Data" />
                <Button disabled={historyText.length === 0} icon={"history"} style={{ borderRadius: 10, margin: 10 }} mode="contained" onPress={() => saveModal()}>Save</Button>
              </Card>
            </View>
          </SafeAreaView>
        </Modal>
        {/* Show save modal */}
        <Button icon={"history"} style={{ margin: 10 }} mode="contained" onPress={() => setModalVisible(true)}>Save to History</Button>
      </ScrollView>
      <Button textColor='white' style={{ position: "absolute", margin: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} mode="contained" onPress={() => navigation.navigate("CameraScreen")}>Back</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  view1: {
    flex: 1,
    alignItems: "center",
    width: 300,
    height: 200,
  },
  card: {
    marginVertical: 10,
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  moretitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    marginBottom: 10,
  },
  symptomsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  symptom: {
    marginLeft: 10,
  },
});
