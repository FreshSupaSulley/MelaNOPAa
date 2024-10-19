import React from "react";
import { Button, Text, Card, Banner } from "react-native-paper";
import { StyleSheet, Image, ScrollView, View } from "react-native";

const diseases = [
  {
    name: "Actinic Keratoses and Intraepithelial Carcinomae",
    type: "Cancer",
    description: "Actinic keratoses are rough, scaly patches on the skin caused by years of sun exposure. They can sometimes progress to squamous cell carcinoma.",
    symptoms: ["Rough, scaly patches", "Itching or burning", "Redness or inflammation"],
  },
  {
    name: "Basal Cell Carcinoma",
    type: "Cancer",
    description: "Basal cell carcinoma is a type of skin cancer that begins in the basal cells. It often appears as a slightly transparent bump on the skin.",
    symptoms: ["Pearly or waxy bump", "Flat, flesh-colored lesion", "Bleeding or scabbing sore"],
  },
  {
    name: "Benign Keratosis-like Lesions",
    type: "Non-Cancerous",
    description: "Benign keratosis-like lesions are non-cancerous growths that can appear on the skin. They are often mistaken for warts or moles.",
    symptoms: ["Warty surface", "Round or oval shape", "Varied colors"],
  },
  {
    name: "Dermatofibroma",
    type: "Non-Cancerous",
    description: "Dermatofibromas are benign skin growths that often appear on the lower legs. They are firm and can be slightly raised.",
    symptoms: ["Firm, raised nodule", "Brownish color", "Itching or tenderness"],
  },
  {
    name: "Melanocytic Nevi",
    type: "Non-Cancerous",
    description: "Melanocytic nevi, commonly known as moles, are benign growths of melanocytes. They can appear anywhere on the skin.",
    symptoms: ["Small, dark spots", "Round or oval shape", "Even color"],
  },
  {
    name: "Pyogenic Granulomas and Hemorrhage",
    type: "Can lead to cancer",
    description: "Pyogenic granulomas are small, reddish bumps on the skin that bleed easily. They are often caused by injury or irritation.",
    symptoms: ["Small, reddish bump", "Bleeding", "Rapid growth"],
  },
  {
    name: "Melanoma",
    type: "Cancer",
    description: "Melanoma is the most serious type of skin cancer. It develops in the cells that produce melanin, the pigment that gives your skin its color.",
    symptoms: ["Large brownish spot", "Mole that changes color", "Itching or tenderness"],
  },
];

export default function MapScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {diseases.map((disease, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Banner
              style={styles.banner}
              visible
            >
              <Text variant="titleLarge" style={styles.title}>{disease.name}</Text>
              <Text variant="bodyMedium" style={styles.type}>{disease.type}</Text>
            </Banner>
            <Text variant="bodyMedium" style={styles.description}>{disease.description}</Text>
            <Text variant="titleLarge" style={styles.symptomsTitle}>Symptoms:</Text>
            {disease.symptoms.map((symptom, idx) => (
              <Text key={idx} variant="bodyMedium" style={styles.symptom}>{symptom}</Text>
            ))}
          </Card.Content>
        </Card>
      ))}
      <Button
        style={{ margin: 20 }}
        onPress={() => navigation.navigate("DiseaseInfo")}
        mode="contained"
      >
        Learn More
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  banner: {
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  type: {
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  symptomsTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  symptom: {
    marginLeft: 10,
  },
});
