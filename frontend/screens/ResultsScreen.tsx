import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button, Card, DataTable, IconButton, Text, TextInput } from "react-native-paper";

export default function ResultsScreen({ navigation }) {
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const [cancerData, setCancerData] = useState([0]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [risk, setRisk] = useState("");
  const [potentialType, setPotentialType] = useState("");
  const [riskColor, setRiskColor] = useState("white");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Image processing
    // Update photo
    setPhoto(route.params?.['image']);
    setCancerData(route.params?.['data'].data);
    calculateRisks(route.params?.['data'].data);
  }, [route.params]);

  function findColor(risk) {
    // Get constant to multiply by
    let ratio = risk / 100;
    // Calculating RGB values
    let red = ((210 - 75) * ratio) + 75;
    let green = (210 - 75) * (1 - ratio) + 75;
    console.log(red + " " + green, ratio);
    // Set color state
    setRiskColor(`rgb(${red}, ${green}, 75)`);
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
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1}}>
            <View style={{}}>
              <Text style={{}}>Hello World!</Text>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>
        {/* Show save modal */}
        {/* <Button textColor='white' style={{ position: "absolute", margin: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} mode="contained" onPress={() => navigation.navigate("CameraScreen")}>Back</Button> */}
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
