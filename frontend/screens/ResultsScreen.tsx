import React, { useState } from 'react';
import { Banner, Button, DataTable, Text } from "react-native-paper";
import { StyleSheet, Image, Platform, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Collapsible from "react-native-collapsible";
import { useRoute } from "@react-navigation/native";


export default function ResultsScreen({ navigation }) {
    const data = {aKAIC: 0, bCC: 0, bKLL: 0, dF: 0, mN: 0, pGAH: 0, mel: 0}
    const [isCollapsed, setIsCollapsed] = useState(true);

    
    return (
     <View style = {{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
            <Banner elevation={5} style={{ borderRadius: 10, margin: 8, marginTop: 0 }} visible>
                <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                    Probability of Maliciousness: {(data.aKAIC + data.bCC + data.pGAH + data.mel).toFixed(2)}%
                </Text>
                <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                    Potential Type: {Math.max(data.aKAIC, data.bCC, data.bKLL, data.dF, data.mN, data.pGAH, data.mel)}
                </Text>
            </Banner>

            <Image source={{ uri: 'INSERT URL HERE' }}/>

            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
                <Text style={{ fontWeight: "bold" }}>
                    More Details
                </Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCollapsed}>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell> Probability of Actinic Keratosis Intraepithelial Carcinoma (Cancerous):</DataTable.Cell>
                        <DataTable.Cell> {data.aKAIC.toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Basal Cell Carcinoma (Cancerous):</DataTable.Cell>
                        <DataTable.Cell>{data.bCC.toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Benign Keratosis-Like Lesion (Non-Cancerous):</DataTable.Cell>
                        <DataTable.Cell>{data.bKLL.toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Dermatofibroma (Non-Cancerous):</DataTable.Cell>
                        <DataTable.Cell>{data.dF.toFixed(2)}%</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Melanocytic Nevi:</DataTable.Cell>
                        <DataTable.Cell>{data.mN.toFixed(2)}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Pyogenic Granulomas and Hemorrhage (Can lead to Cancer):</DataTable.Cell>
                        <DataTable.Cell>{data.pGAH.toFixed(2)}.</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Probability of Melanoma (Cancerous):</DataTable.Cell>
                        <DataTable.Cell>{data.mel.toFixed(2)}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </Collapsible>
        </ScrollView>

       
    </View>
  );
}
