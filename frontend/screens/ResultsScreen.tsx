import { Banner, Button, Text } from "react-native-paper";
import { StyleSheet, Image, Platform, SafeAreaView, View, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Collapsible from "react-collapsible";
import { useRoute } from "@react-navigation/native";
import 



export default function ResultsScreen({ navigation }) {
    const data = {aKAIC: 0, bCC: 0, bKLL: 0, dF: 0, mN: 0, pGAH: 0, mel: 0}

    
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

            <Collapsible trigger='More Details'>
                <table>
                    <tr>
                        <td> Actinic Keratoses and Intraepithelial Carinomae (Cancerous): </td>
                        <td> {data.aKAIC}%</td>
                    </tr>
                    <tr>
                        <td> Basel Cell Carcinoma (Cancerous): </td>
                        <td> {data.bCC}%</td>
                    </tr>
                    <tr>
                        <td> Benign Keratosis-like Lesions (Non-Cancerous): </td>
                        <td> {data.bKLL}%</td>
                    </tr>
                    <tr>
                        <td> Dermatofibroma (Non-Cancerous): </td>
                        <td> {data.dF}%</td>
                    </tr>
                    <tr>
                        <td> Melanocytic Nevi (Non-Cancerous): </td>
                        <td> {data.mN}%</td>
                    </tr>
                    <tr>
                        <td> Pyogenic Garnulomas and Hemorrhage (Can Lead to Cancer): </td>
                        <td> {data.pGAH}%</td>
                    </tr>
                    <tr>
                        <td> Melanoma (Cancerous): </td>
                        <td> {data.mel}%</td>
                    </tr>
                </table>
            </Collapsible>

        </ScrollView>

       
    </View>
  );
}
