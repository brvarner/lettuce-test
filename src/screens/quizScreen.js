import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { QuizButton, QuizQAndA } from "../components";
import jsonData from "../../qAndA.json";

export default function QuizScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [buttonText, setButtonText] = useState("NEXT QUESTION");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const questions = jsonData;

  return (
    <View style={styles.container}>
      <View style={styles.titleAndDesc}>
        <Text style={styles.titleText}>QUIZ</Text>
        <Text style={styles.descText}>
          Finish the quiz to find out where you should have dinner!
        </Text>
      </View>
      <View>
        <QuizQAndA
          questions={questions}
          questionIndex={questionIndex}
          points={points}
          setPoints={setPoints}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
        <QuizButton
          questions={questions}
          buttonText={buttonText}
          setButtonText={setButtonText}
          points={points}
          score={score}
          setScore={setScore}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          navigation={navigation}
          selectedAnswer={selectedAnswer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // backgroundColor: "red"
  },
  titleAndDesc: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginBottom: "10%",
  },
  descText: {
    fontFamily: "Poppins-Regular",
    marginTop: 5,
    fontSize: 20,
    textAlign: "center",
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 60,
    letterSpacing: 10,
  },
});
