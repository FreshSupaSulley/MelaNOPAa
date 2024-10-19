import React, { useState } from 'react';
import { Banner, Button, DataTable, Text, Card, IconButton } from "react-native-paper";
import { StyleSheet, Image, Platform, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Collapsible from "react-native-collapsible";
import { useRoute } from "@react-navigation/native";


export default function ResultsScreen({ navigation }) {
    const data = {aKAIC: 0, bCC: 0, bKLL: 0, dF: 0, mN: 0, pGAH: 0, mel: 0}
    const [isCollapsed, setIsCollapsed] = useState(true);

    
    return (
     <View style = {styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
            <Card elevation={5} style={styles.card}>
                <Text style={styles.title}>
                    Skin Cancer Risk: {(data.aKAIC + data.bCC + data.pGAH + data.mel).toFixed(2)}%
                </Text>
                <Text style={styles.subtitle}>
                    Potential Type: {Math.max(data.aKAIC, data.bCC, data.bKLL, data.dF, data.mN, data.pGAH, data.mel)}
                </Text>
            </Card>

            <Image source={{ uri: 'INSERT URL HERE' }}/>

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
                        <DataTable.Cell>{(parseFloat(data.aKAIC.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Basal Cell Carcinoma (Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.bCC.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Benign Keratosis-Like Lesion (Non-Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.bKLL.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Dermatofibroma (Non-Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.dF.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Melanocytic Nevi:</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.mN.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell  style={{flex:4}}><Text>Pyogenic Granulomas and Hemorrhage (Can lead to Cancer):</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.pGAH.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:4}}><Text>Melanoma (Cancerous):</Text></DataTable.Cell>
                        <DataTable.Cell>{(parseFloat(data.mel.toFixed(2)) * 100).toFixed(2)}%</DataTable.Cell>
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