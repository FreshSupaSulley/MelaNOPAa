import React, { useState, useEffect} from 'react';
import { Banner, Button, DataTable, Text, Card, IconButton } from "react-native-paper";
import { StyleSheet, Image, Platform, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Collapsible from "react-native-collapsible";
import { useRoute } from "@react-navigation/native";


export default function ResultsScreen({ navigation }) {

  const route = useRoute();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const data = route.params?.['data'];
    const location = route.params?.['location'];
    const width = route.params?.['width'];
    const height = route.params?.['height'];
    console.log("Gotss " + width + " " + height);
    // Image processing
    // Update photo
    setPhoto(route.params?.['uri']);
  }, [route.params?.['uri']]);



    //DELETE LATER: const data = {aKAIC: 0, bCC: 0, bKLL: 0, dF: 0, mN: 0, pGAH: 0, mel: 0}
    const [isCollapsed, setIsCollapsed] = useState(true);

    /* Determine most likely type of condition */
    let indexOfMax = data.indexOf(Math.max(...data))
    let potentialType;
    switch(indexOfMax){
      case 0:
        potentialType = "Actinic Keratoses and Intraepithelial Carcinomae (Cancerous)";
      case 1:
        potentialType = "Basal Cell Carcinoma (Cancerous";
      case 2:
        potentialType = "Benign Keratosis-like Lesions (Non-Cancerous)";
      case 3:
        potentialType = "Dermatofibroma (Non-Cancerous)";
      case 4:
        potentialType = "Melanocytic Nevi (Non-Cancerous)";
      case 5:
        potentialType = "Pyogenic Granulomas and Hemorrhage (Can lead to Cancer)";
      case 6:
        potentialType = "Melanoma (Cancerous)";
    }
        
    return (
     <View style = {styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
            <Card elevation={5} style={styles.card}>
                <Text style={styles.title}>
                    Skin Cancer Risk: {((data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6])*100).toFixed(2)}%
                </Text>
                <Text style={styles.subtitle}>
                    Potential Type: {potentialType}
                </Text>
            </Card>

            <Image source={{ uri: photo }}/>

            <Card style={styles.card}>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{marginRight: 'auto'}}>
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
                        <DataTable.Cell style={{flex:4}}><Text>Actinic Keratosis Intraepithelial Carcinoma (Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[0]*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Basal Cell Carcinoma (Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[1]*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Benign Keratosis-Like Lesion (Non-Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data.[2]*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Dermatofibroma (Non-Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[3]*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Melanocytic Nevi:</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[4]*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell  style={{flex:4}}><Text>Pyogenic Granulomas and Hemorrhage (Can lead to Cancer):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[5].pGAH*100).toFixed(2))}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Melanoma (Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{((data[6].mel*100).toFixed(2))}%</DataTable.Cell>
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
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  moretitle: {
    fontSize: 16,
    marginBottom: 10,
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