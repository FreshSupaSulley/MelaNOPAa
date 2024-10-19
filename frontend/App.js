import React from "react";
import { Appearance, SafeAreaView, StatusBar, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Navigation from "./StackNavigator";
import * as Theme from "./themes";

// App entry point
export default function App() {
  // Call API
  let colorScheme = Appearance.getColorScheme();
  colorScheme = "dark";
  // Define theme
  let theme = colorScheme == "light" ? Theme.lightTheme : Theme.darkTheme
  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation />
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
}
