import { render, fireEvent } from "@testing-library/react-native";
import QuizButton from "../../components/quizDisplay/quizButton.js";
import jsonData from "../../../qAndA.json";

// Create a mock navigation object
const mockNavigation = {
  navigate: jest.fn(),
};

// I was having trouble building a test for navigating with params
// to the EndScreen after the quiz is complete, so instead
// I wrote a test for the EndScreen to ensure it always received a score.

// My logic was that if the EndScreen is rendering without a score parameter,
// as the only way to navigate to that screen is with the QuizButton,
// then the QuizButton has not done its job.
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
  const createBlankAnswerAlert = jest.fn();
  const selectedAnswer = (questionIndex) => {
    if (questionIndex === 0) {
      return null;
    } else {
      return questions[questionIndex - 1].answers[0].answer;
    }
  };

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
        selectedAnswer={selectedAnswer(questionIndex)}
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
        selectedAnswer={selectedAnswer(questionIndex)}
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
        selectedAnswer={"TEST"}
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
        selectedAnswer={"TEST"}
        questions={questions}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );

    fireEvent.press(getByTestId("button"));

    expect(setQuestionIndex).toHaveBeenCalledWith(questionIndex + 1);
  });

  it("should refuse to advance if selectedAnswer is null", () => {
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

    fireEvent.press(getByTestId("button"));
    expect(createBlankAnswerAlert).toHaveBeenCalled();
  });

  it("should change buttonText before last question answered", () => {
    const { getByTestId, getByText } = render(
      <QuizButton
        buttonText={buttonText}
        setButtonText={setButtonText}
        points={points}
        score={score}
        setScore={setScore}
        selectedAnswer={selectedAnswer(questionIndex)}
        questions={questions}
        questionIndex={4}
        setQuestionIndex={setQuestionIndex}
        navigation={navigation}
      />
    );
    const button = getByTestId("button");
    fireEvent.press(button);

    const buttonTextElement = getByText("SUBMIT");
    expect(buttonTextElement).toBeTruthy();
  });
});
