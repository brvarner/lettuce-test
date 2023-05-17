import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StartAndEndButton } from "../components";

export default function EndScreen({ route, navigation }) {
  const { score } = route.params;

  // I went on the Lettuce Entertain You site and copied the brief description for each
  // restaurant, now we take in the score that the user earns and give them a
  // more robust recommendation using this switch case.
  const recommendation = (score) => {
    switch (true) {
      case score <= 10:
        return {
          name: "Tallboy",
          desc: `Located in Streeterville just off of Michigan Avenue, Tallboy Taco offers a menu inspired by fresh and simple ingredients. Tacos served on hand-pressed corn tortillas, include Grilled Chicken Chimichurri, Carne Asada, and Crispy Fish, as well as all-day breakfast options. Enjoy starters like Guacamole and Queso Blanco with Poblano Pepper, rotating seasonal ceviches, aguas frescas, and frozen margaritas, plus a coffee program with creative options like Housemade Horchata Black and Tan. Counter service, dine-in and carryout available.`,
        };
      case score >= 11 && score <= 16:
        return {
          name: "Beatrix",
          desc: `Beatrix is a neighborhood coffeehouse, restaurant and meeting place in Chicago's River North, Loop, Streeterville, Fulton Market and Oak Brook neighborhoods. Beatrix is the ultimate destination for those who live and work in the neighborhood.`,
        };
      case score >= 17 && score <= 21:
        return {
          name: "Hub 51",
          desc: `Hub 51 is a social dining spot serving up contemporary American eats in Chicago’s River North neighborhood. Open for lunch, dinner, brunch and late night dining. The menu has something for everyone from homemade tacos and massive two-handed sandwiches to main-dish salads and sushi. Hub 51 also offers a locally focused craft beer program, seasonal craft cocktails and new world wines.`,
        };
      case score >= 22 && score <= 26:
        return {
          name: "RPM Seafood",
          desc: `RPM Seafood is a dramatic multi-level restaurant overlooking the Chicago River featuring the truest expression of the world’s best fish and seafood.`,
        };
      default:
        return "any of the fine restaurants in the Lettuce Entertain You family";
    }
  };

  let rec = recommendation(score);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.tryText}>You should try...</Text>
        <View style={styles.answerContainer}>
          <Text style={styles.titleText}>{rec.name}!</Text>
          <View style={styles.descContainer}>
            <Text style={styles.descText}>{rec.desc}</Text>
          </View>
        </View>
      </View>
      <StartAndEndButton
        buttonText="TRY AGAIN"
        destination="Home"
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 50,
    letterSpacing: 5,
    marginBottom: 5,
  },
  contentContainer: {
    marginTop: "25%",
  },
  answerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  descContainer: {
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "white",
  },
  descText: {
    fontFamily: "Poppins-Regular",
  },
  tryText: {
    fontFamily: "Poppins-Light",
    marginBottom: 10,
  },
});
