import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";


export default function StartAndEndButton({
  buttonText,
  destination,
  navigation,
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(destination)}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9DB2BE",
    borderRadius: 15,
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
    width: "40%"
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});
