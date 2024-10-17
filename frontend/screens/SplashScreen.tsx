import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Swiper from "react-native-screens-swiper";

const styles = {
    pillButton: {
        minWidth: 30,
        height: 32,
        backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    pillLabelActive: {
        color: 'yellow'
    },
    pillActive: {
        backgroundColor: 'yellow',
    },
    pillLabel: {
        marginLeft: 5,
        color: 'yellow'
    },
    pillContainer: {
        paddingHorizontal: 5,
    },
    staticPillContainer: {
        backgroundColor: 'yellow',
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
    },
};

// Return loading screen while we wait
export default function SplashScreen({ navigation }) {
    const data = [
        {
            tabLabel: 'Step 1',
            component: (
                <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>1. Find a concerning mole</Text>
                    <Card style={{ margin: 20 }}>
                        <Card.Cover source={require('../assets/step1.png')} />
                    </Card>
                    {/* Look out for */}
                    <View style={{ margin: 10 }}>
                        <Text variant="titleLarge" style={{ marginBottom: 2 }}>Things to look out for:</Text>
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
            ),
        },
        {
            tabLabel: 'Step 2',
            component: (
                <View showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>2. Upload to our AI</Text>
                    <Card style={{ margin: 20 }}>
                        <Card.Cover resizeMode="center" source={require('../assets/step2.png')} />
                    </Card>
                    {/* Look out for */}
                    <View style={{ margin: 10 }}>
                        <Text variant="bodyMedium">We'll use our proprietary AI model trained on a dataset with thousands of images to give an accurate diagnosis. <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Your data is never stored, only processed by our models.</Text></Text>
                    </View>
                </View>
            ),
            props: {}, // (optional) additional props
        },
        {
            tabLabel: 'Step 3',
            component: (
                <View showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>3. We'll diagnose it</Text>
                    <Card style={{ margin: 20 }}>
                        <Card.Cover source={require('../assets/step3.png')} />
                    </Card>
                    {/* Look out for */}
                    <View style={{ margin: 10 }}>
                        <Text variant="titleLarge" style={{ marginBottom: 10 }}>We can diagnose multiple types of skin cancer, including:</Text>
                        <Card mode="outlined">
                            <Card.Content>
                                <Text variant="bodyMedium">Actinic keratosis, Basal cell carcinoma, Dermatofibroma, Melanoma, Nevus, Pigmented benign keratosis, Seborrheic keratosis, Squamous cell carcinoma, and Vascular lesion.</Text>
                            </Card.Content>
                        </Card>
                    </View>
                    {/* Go button */}
                    <Button onPress={() => {
                        navigation.navigate("Main");
                    }} icon="camera" mode="contained">Let's Scan</Button>
                </View>
            ),
            props: {}, // (optional) additional props
        },
    ];
    // Return
    return (
        <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
            <Swiper
                data={data}
                isStaticPills={true}
                styles={styles}
            />
        </SafeAreaView>
    )
}
