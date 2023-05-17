import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react-native";
import jsonData from "../../../qAndA.json";
import QuizQAndA from "../../components/quizDisplay/quizQAndA.js";
import React from "react";

afterEach(() => {
  cleanup();
});

describe("QuizQAndA", () => {
  const questionIndex = 0;
  const questions = jsonData;
  const points = 0;
  const setPoints = jest.fn();
  const selectedAnswer = null;
  const setSelectedAnswer = jest.fn();

  it("should render properly", () => {
    render(
      <QuizQAndA
        questionIndex={questionIndex}
        questions={questions}
        points={points}
        setPoints={setPoints}
      />
    );
  });

  it("should display questions and answers properly", () => {
    render(
      <QuizQAndA
        questionIndex={questionIndex}
        questions={questions}
        points={points}
        setPoints={setPoints}
      />
    );

    const currentQuestion = questions[questionIndex];

    const questionText = screen.getByText(currentQuestion.question);

    currentQuestion.answers.forEach((answer) => {
      const answerText = screen.getByText(answer.answer);
      expect(answerText).toBeTruthy();
    });

    expect(questionText).toBeTruthy();
  });

  it("should have working radio buttons that activate style when pressed", async () => {
    const { getByTestId } = render(
      <QuizQAndA
        questionIndex={questionIndex}
        questions={questions}
        points={points}
        setPoints={setPoints}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
      />
    );

    questions[questionIndex].answers.forEach(async (answer, index) => {
      const answerButton = getByTestId(`radio-button-${index}`);

      // Check initial style and point value
      expect(answerButton.props.style.backgroundColor).toBe(undefined);
      expect(answerButton.props.style.height).toBe(undefined);
      expect(answerButton.props.style.width).toBe(undefined);
      expect(answerButton.props.style.borderRadius).toBe(undefined);

      fireEvent.press(answerButton);

      // Test leaking due to improper teardown?
      await waitFor(() => {
        // Check updated style and points value
        expect(answerButton.props.style.backgroundColor).toBe("#9DB2BE");
        expect(answerButton.props.style.height).toBe(15);
        expect(answerButton.props.style.width).toBe(15);
        expect(answerButton.props.style.borderRadius).toBe(15);
      });
    });
  });

  it("should use those radio buttons to update the total points each time a new option is clicked", () => {
    const { getByTestId } = render(
      <QuizQAndA
        questionIndex={questionIndex}
        questions={questions}
        points={points}
        setPoints={setPoints}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
      />
    );

    questions[questionIndex].answers.forEach(async (answer, index) => {
      const answerButton = getByTestId(`radio-button-${index}`);

      expect(points).toBe(0);

      
      fireEvent.press(answerButton);

      expect(setPoints).toHaveBeenCalledWith(answer.points);
    });
  });
});
