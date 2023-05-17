import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function QuizQAndA({
  questionIndex,
  questions,
  setPoints,
  selectedAnswer,
  setSelectedAnswer,
}) {
  const currentQuestion = questions[questionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion?.question}</Text>
      <View style={styles.questionBorder} />
      <View styles={styles.questionContainer}>
        {currentQuestion?.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setPoints(answer.points);
              setSelectedAnswer(answer);
            }}
            style={styles.answerContainer}
          >
            <View style={styles.bubble}>
              <View
                testID={`radio-button-${index}`}
                style={
                  answer === selectedAnswer
                    ? styles.selectedAnswer
                    : styles.unselectedAnswer
                }
              ></View>
            </View>
            <Text style={styles.answerText} key={index}>
              {answer.answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  answerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  bubble: {
    height: 25,
    width: 25,
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 15,
    borderColor: "#9DB2BE",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#9DB2BE",
    height: 350,
    width: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  questionBorder: {
    width: "90%",
    height: "1%",
    backgroundColor: "#9DB2BE",
    margin: 10,
  },
  questionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "90%",
    height: "80%"
  },
  selectedAnswer: {
    backgroundColor: "#9DB2BE",
    height: 15,
    width: 15,
    borderRadius: 15,
  },
  unselectedAnswer: {},
  questionText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  },
});
