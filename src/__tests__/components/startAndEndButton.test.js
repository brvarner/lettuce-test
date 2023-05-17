import { render, fireEvent } from "@testing-library/react-native";
import { StartAndEndButton } from "../../components";
import { useNavigation } from "@react-navigation/native";

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("StartAndEndButton", () => {
  const buttonText = "TEST";
  const destination = "Home";

  beforeEach(() => {
    // Set the mockReturnValue for useNavigation
    useNavigation.mockReturnValue(mockNavigation);
  });

  it("should render properly", () => {
    render(
      <StartAndEndButton buttonText={buttonText} destination={destination} />
    );
  });

  it("should display buttonText properly", () => {
    const { getByText } = render(
      <StartAndEndButton buttonText={buttonText} destination={destination} />
    );

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeDefined();
  });

  it("should respond when pressed by going to its destination", () => {
    const { getByText } = render(
      <StartAndEndButton
        buttonText={buttonText}
        destination={destination}
        navigation={mockNavigation}
      />
    );

    const buttonElement = getByText(buttonText);
    fireEvent.press(buttonElement);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(destination);
  });
});
