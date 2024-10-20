import React from "react";
import { Button, Text, Card, Banner } from "react-native-paper";
import { StyleSheet, Image, ScrollView, View } from "react-native";

const diseases = [
  {
    name: "Actinic Keratoses and Intraepithelial Carcinomae",
    type: "Cancer",
    description: "Actinic keratoses are rough, scaly patches on the skin caused by years of sun exposure. They can progress into Intraepidermal Carcinoma",
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
    type: "Non-Cancerous",
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
      <Banner
        style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        elevation={5}
        visible={true}
        icon="information"
      >
        <Text style={{ fontWeight: "bold" }}>Disclaimer</Text>: The information provided here is intended for preliminary screening purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </Banner>
      {/* Info on the info screen */}
      <Text variant="bodyMedium" style={{ margin: 10, marginTop: 30 }}>These are the lesions our model is trained to detect. Each type of lesion is categorized as cancerous or non-cancerous. <Text style={{ fontWeight: "bold" }}>Not all are dangerous.</Text></Text>
      {diseases.map((disease, index) => (
        <Card key={index} style={styles.card} mode="outlined">
          <Card.Content>
            <Text style={styles.title}>{disease.name}</Text>
            <Text style={styles.subtitle}>{`Type: ${disease.type}`}</Text>
            <Text style={styles.description}>{disease.description}</Text>
            <Text style={styles.symptomsTitle}>Symptoms:</Text>
            {disease.symptoms.map((symptom, idx) => (
              <Text key={idx} style={styles.symptom}>{`${idx + 1}. ${symptom}`}</Text>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  card: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
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
