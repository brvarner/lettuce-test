import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import QuizButton from "../../components/quizDisplay/quizButton.js";
import jsonData from "../../../qAndA.json";

// Create a mock navigation object
const mockNavigation = {
  navigate: jest.fn(),
};

describe("QuizButton", () => {
  const buttonText = "NEXT QUESTION";
  const setButtonText = jest.fn();
  const points = 10;
  const score = 0;
  const setScore = jest.fn();
  let questionIndex = 0;
  const setQuestionIndex = jest.fn();
  const navigation = mockNavigation;
  const questions = jsonData;
  const selectedAnswerStandard = "TEST";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={selectedAnswerStandard}
        questions={questions}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );
  });

  it("should respond when pressed", () => {
    const { getByTestId } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={selectedAnswerStandard}
        questions={questions}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );
    fireEvent.press(getByTestId("button"));
  });

  it("should add user answer's points to score", () => {
    const { getByTestId } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={selectedAnswerStandard}
        questions={questions}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );

    fireEvent.press(getByTestId("button"));

    expect(setScore).toHaveBeenCalledTimes(1);
    expect(setScore).toHaveBeenCalledWith(score + points);
  });

  it("should advance to next question", () => {
    const { getByTestId } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        questionIndex={questionIndex}
        selectedAnswer={selectedAnswerStandard}
        questions={questions}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );

    fireEvent.press(getByTestId("button"));

    expect(setQuestionIndex).toHaveBeenCalledWith(questionIndex + 1);
  });

  it("should fire alert that prevents advancing if selectedAnswer is null", () => {
    const { getByTestId } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={null}
        questions={questions}
        questionIndex={4}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );

    jest.spyOn(Alert, "alert");

    fireEvent.press(getByTestId("button"));

    expect(Alert.alert).toHaveBeenCalled();
  });

  // The functionality works, but I could not wrap my mind around how to structure this test.
  it("should fire alert that prevents advancing if selectedAnswer is the same as one from the last question", () => {
    const questionIndex = 2;
    const oldVariableValue = questions[1].answers[0].answer;

    const { getByTestId } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={oldVariableValue}
        questions={questions}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );

    expect(questions[questionIndex].answers).not.toContain(oldVariableValue);

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    fireEvent.press(getByTestId("button"));

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy.mock.calls.length).toBeGreaterThanOrEqual(1);

    alertSpy.mockRestore();
  });

  it("should change buttonText before last question answered", async () => {
    const { getByTestId, getByText } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={selectedAnswerStandard}
        questions={questions}
        questionIndex={4}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );
    const button = getByTestId("button");
    fireEvent.press(button);

    await waitFor(() => {
      const buttonTextElement = getByText("SUBMIT");
      expect(buttonTextElement).toBeTruthy();
    });
  });
});
