import React, { useState } from 'react';
import { Banner, Button, Text } from "react-native-paper";
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
          <Text>
            Probability of Actinic Keratosis, Intraepithelial Carcinoma: {data.aKAIC}%
          </Text>
          <Text>
            Probability of Basal Cell Carcinoma: {data.bCC}%
          </Text>
          <Text>
            Probability of Benign Keratosis-Like Lesion: {data.bKLL}%
          </Text>
          <Text>
            Probability of Dermatofibroma: {data.dF}%
          </Text>
          <Text>
            Probability of Melanocytic Nevi: {data.mN}%
          </Text>
          <Text>
            Probability of Pigmented Actinic Keratosis, Bowen's Disease: {data.pGAH}%
          </Text>
          <Text>
            Probability of Melanoma: {data.mel}%
          </Text>
        </Collapsible>

        </ScrollView>

       
    </View>
  );
}
