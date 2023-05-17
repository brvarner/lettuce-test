import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StartAndEndButton } from "../components";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>QUIZ</Text>
      <View style={styles.textAndButtonContainer}>
        <Text style={styles.text}>
          Having a hard time deciding where to eat tonight? Take our quiz to
          earn an enticing recommendation!
        </Text>
        <StartAndEndButton
          buttonText="START"
          destination="Quiz"
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 50,
    letterSpacing: 6,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  textAndButtonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#9DB2BE",
    borderRadius: 15,
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "15%",
  },
  startButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});
