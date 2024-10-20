import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Image } from "react-native";
import { Banner, Button, Card, Text, useTheme } from "react-native-paper";
import Swiper from "react-native-screens-swiper";

// Return loading screen while we wait
export default function SplashScreen({ navigation }) {
    const theme = useTheme();
    const styles = {
        borderActive: {
            borderColor: theme.colors.primary,
        },
        pillContainer: {
            backgroundColor: "rgba(0, 0, 0, 0)",
        },
    };
    const data = [
        {
            tabLabel: 'Step 1',
            component: (
                <View style={{ flex: 1 }}>
                    <Banner elevation={5} style={{ borderRadius: 10, margin: 8, marginTop: 0 }} visible><Text variant="titleLarge" style={{ fontWeight: "bold" }}>1. Locate a mole or lesion</Text></Banner>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                        <Card style={{ margin: 10 }}>
                            <Image style={{ width: '100%', height: 200 }} resizeMode="center" source={require('../assets/step1.png')} />
                        </Card>
                        {/* Look out for */}
                        <View style={{ margin: 10 }}>
                            <Text variant="titleLarge" style={{ marginBottom: 2, fontWeight: "bold" }}>What to look for:</Text>
                            <Text variant="bodyMedium">Doctors use a checklist which explains some of the signs of melanoma to look out for. It's called the <Text style={{ fontWeight: "bold" }}>ABCDE</Text> list. See your doctor straight away if you are worried.</Text>
                            <Card style={{ marginTop: 10 }} mode="outlined">
                                <Card.Content>
                                    <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>A</Text>symmetrical</Text>
                                    <Text variant="bodyMedium">Melanomas are likely to have an uneven shape.</Text>
                                    <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>B</Text>order</Text>
                                    <Text variant="bodyMedium">Melanomas are more likely to have irregular edges.</Text>
                                    <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>C</Text>olor</Text>
                                    <Text variant="bodyMedium">Melanomas are often an uneven colour and contain more than one shade.</Text>
                                    <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>D</Text>iameter</Text>
                                    <Text variant="bodyMedium">Most melanomas are more than 6mm wide.</Text>
                                    <Text variant="titleLarge"><Text style={{ fontWeight: "bold" }}>E</Text>volving</Text>
                                    <Text variant="bodyMedium">Melanomas might change in size, shape or colour.</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </ScrollView>
                </View>
            ),
        },
        {
            tabLabel: 'Step 2',
            component: (
                <View style={{ flex: 1 }}>
                    <Banner elevation={5} style={{ borderRadius: 10, margin: 8, marginTop: 0 }} visible><Text variant="titleLarge" style={{ fontWeight: "bold" }}>2. Upload to our AI</Text></Banner>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                        <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={require('../assets/step2.png')} />
                        {/* Look out for */}
                        <View style={{ margin: 10 }}>
                            <Text variant="bodyMedium">We'll use our proprietary AI model trained on a dataset with thousands of images to give an accurate diagnosis. <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Your data is never stored, only processed by our models.</Text></Text>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text variant="bodyMedium">Our model is capable of detecting benign and potentially malignant formations on the skin, in addition to classifying the type of skin cancer at a <Text style={{ fontWeight: "bold" }}>70% accuracy</Text>. Any malignant diagnoses should be followed up with a medical professional.</Text>
                        </View>
                    </ScrollView>
                </View>
            ),
        },
        {
            tabLabel: 'Step 3',
            component: (
                <View style={{ flex: 1 }}>
                    <Banner elevation={5} style={{ borderRadius: 10, margin: 8, marginTop: 0, marginBottom: 0 }} visible><Text variant="titleLarge" style={{ fontWeight: "bold" }}>3. We'll diagnose it.</Text></Banner>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                        <Image style={{ width: '100%', height: '78%' }} resizeMode="contain" source={require('../assets/step3.png')} />
                        {/* Look out for */}
                        <View style={{ margin: 5, flex: 1, justifyContent: "space-between" }}>
                            <Text variant="titleLarge" style={{ marginBottom: 10 }}>Our AI models can diagnose multiple types of skin cancer, including:</Text>
                            <Card mode="outlined">
                                <Card.Content>
                                    <Text variant="bodyMedium">Actinic keratosis, Basal cell carcinoma, Melanoma, and Pyogenic granulomas and hemorrhage.</Text>
                                </Card.Content>
                            </Card>
                            <Text style={{ marginTop: 10 }} variant="bodyMedium"><Text style={{ fontWeight: "bold" }}>Note</Text>: Any malignant diagnoses should be followed up with a medical professional.</Text>
                        </View>
                    </ScrollView>
                    {/* Go button */}
                    <Button style={{ margin: 20 }} onPress={() => {
                        navigation.navigate("Main");
                    }} icon="camera" mode="contained">Scan Moles</Button>
                </View>
            ),
        },
    ];
    // Return
    return (
        <Swiper
            data={data}
            isStaticPills={true}
            style={styles}
        />
    )
}
