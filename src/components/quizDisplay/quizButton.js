import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";

export default function QuizButton({
  buttonText,
  setButtonText,
  points,
  score,
  setScore,
  selectedAnswer,
  questions,
  questionIndex,
  setQuestionIndex,
  navigation,
}) {
  const [quizComplete, setQuizComplete] = useState(false);
  const previousQuestion = questions[questionIndex - 1];

  // If the quiz is complete, we take the final tallied score to the endScreen.
  useEffect(() => {
    if (quizComplete === true) {
      navigation.navigate("End", { score: score });
    }
  }, [quizComplete]);

  const createBlankAnswerAlert = () => {
    Alert.alert(
      "Select An Answer",
      "Please pick an answer before continuing",
      [
        {
          text: "OK",
          onPress: () => null,
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // This function keeps track of the score,
  // and changes the button text to "SUBMIT" on the last question.
  // I hard-coded the indeces for questionIndex here for readability sake.

  // Before it runs anything, it checks to make sure the selected answer isn't null
  // if we're still on index zero of the question array. If we're beyond index zero,
  // it checks to make sure that the selected answer doesn't match any of the
  // answers in the previous question's array. If either condition is met,
  // it alerts the user.
  const quizContinue = () => {
    if (
      selectedAnswer === null ||
      (questionIndex > 0 && previousQuestion.answers.includes(selectedAnswer))
    ) {
      createBlankAnswerAlert();
    } else {
      if (questionIndex === 4) {
        setButtonText("SUBMIT");
      }
      if (questionIndex < 5) {
        setScore(score + points);
        setQuestionIndex(questionIndex + 1);
      } else if (questionIndex >= 5) {
        setScore(score + points);
        setQuizComplete(true);
      }
    }
  };

  return (
    <TouchableOpacity
      testID="button"
      style={styles.button}
      onPress={() => {
        console.log("clicked");
        console.log({ buttonText });
        console.log({ questionIndex });
        quizContinue();
      }}
    >
      <Text testID="button-text" style={styles.buttonText}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    backgroundColor: "#9DB2BE",
    width: "50%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    marginTop: 330,
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    letterSpacing: 2,
  },
});
