import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Card, DataTable, IconButton, Text } from "react-native-paper";

export default function ResultsScreen({ navigation }) {
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  const [cancerData, setCancerData] = useState(null);

  useEffect(() => {
    // Image processing
    // Update photo
    setPhoto(route.params?.['image']);
    setCancerData(route.params?.['data']);
  }, [route.params?.['image']]);

  const data = [0, 0, 0, 0.545, 0, 0, 0];
  const [isCollapsed, setIsCollapsed] = useState(true);

  /* Determine most likely type of condition */
  let indexOfMax = data.indexOf(Math.max(...data))
  let potentialType;
  switch (indexOfMax) {
    case 0:
      potentialType = "Actinic Keratoses and Intraepithelial Carcinomae (Cancerous)";
      break;
    case 1:
      potentialType = "Basal Cell Carcinoma (Cancerous";
      break;
    case 2:
      potentialType = "Benign Keratosis-like Lesions (Non-Cancerous)";
      break;
    case 3:
      potentialType = "Dermatofibroma (Non-Cancerous)";
      break;
    case 4:
      potentialType = "Melanocytic Nevi (Non-Cancerous)";
      break;
    case 5:
      potentialType = "Pyogenic Granulomas and Hemorrhage (Can lead to Cancer)";
      break;
    case 6:
      potentialType = "Melanoma (Cancerous)";
      break;
  }

  let risk = ((data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6]) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      {/* DELETE ME */}
      <Text>{JSON.stringify(cancerData)}</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 10 }}>
        <Card elevation={5} style={styles.card}>
          <Text style={styles.title}>
            Skin Cancer Risk: {risk}%
          </Text>
          <Text style={styles.subtitle}>
            Potential Type:
          </Text>
          <Text style={styles.description}>
            {potentialType}
          </Text>
        </Card>
        {/* yall figure this out fuck you */}
        <Image width={'100%'} height={'100%'} source={{ uri: photo }} />

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
                <DataTable.Cell>{((data[0] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Basal Cell Carcinoma (Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((data[1] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Benign Keratosis-Like Lesion (Non-Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((data[2] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Dermatofibroma (Non-Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((data[3] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Melanocytic Nevi:</Text></DataTable.Cell>
                <DataTable.Cell>{((data[4] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Pyogenic Granulomas and Hemorrhage (Can lead to Cancer):</Text></DataTable.Cell>
                <DataTable.Cell>{((data[5] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 4 }}><Text>Melanoma (Cancerous):</Text></DataTable.Cell>
                <DataTable.Cell>{((data[6] * 100).toFixed(2))}%</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Collapsible>

        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 10,
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 10,
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