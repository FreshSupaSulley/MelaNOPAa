import React from "react";
import { Appearance, SafeAreaView, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as Theme from "./themes";
import Navigation from "./components/StackNavigator";

export default function App() {
  // Call API
  let colorScheme = Appearance.getColorScheme();
  colorScheme = "dark";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Including this seems to theme the bar correctly without any params. Maybe it's based off PaperProvider */}
      <StatusBar />
      <PaperProvider
        theme={colorScheme == "light" ? Theme.lightTheme : Theme.darkTheme}
      >
        <Navigation />
      </PaperProvider>
    </SafeAreaView>
  );
}
