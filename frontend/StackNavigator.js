import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Platform, Animated, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

// Screens
import CameraScreen from "./screens/CameraScreen";
import InfoScreen from "./screens/InfoScreen";
import SplashScreen from "./screens/SplashScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import ResultsScreen from "./screens/ResultsScreen";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";

// Navigation is passed in automagically
function Tabs({ navigation }) {
  const Tab = createBottomTabNavigator();
  const iconSize = 30;
  const theme = useTheme();
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarActiveTintColor: theme.colors.primary, tabBarInactiveTintColor: theme.colors.onBackground }}>
      {/* Food screen */}
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "camera" : "camera-outline"} size={iconSize} color={color} />
          ),
        }}
      />
      {/* Map screen */}
      <Tab.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={iconSize} color={color} />
          ),
        }}
      />
      {/* Result screen */}
      <Tab.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{
          title: "Results",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={iconSize} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Navigation() {
  const navigationRef = useRef(null);
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      {/* Configure global screen options */}
      <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false, headerBackTitle: "Back" }}>
        {/* Tutorial */}
        <Stack.Screen name="Tutorial" component={SplashScreen} options={{ animation: 'fade' }} />
        {/* Content */}
        <Stack.Screen name="Main" component={Tabs} options={{ animation: 'fade' }} />
        {/* Processing */}
        <Stack.Screen name="Processing" component={ProcessingScreen} options={{ headerRight: (props) => <Button title="Scan" onPress={() => alert("hi")} />, headerShown: true, headerTitle: "Confirm Image", animation: 'fade_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
