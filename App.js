import { StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QuizScreen, HomeScreen, EndScreen } from "./src/screens";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

// Here we set up the app to be transparent so that the background image is on every page.
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  // Lines 25-41 pre-load the fonts used in the app, and hide the app with a splash screen
  // until the fonts finish loading.
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./assets/pattern.jpg")}
        resizeMode="cover"
        style={styles.background}
        onLayout={onLayoutRootView}
      >
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="End"
              component={EndScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
