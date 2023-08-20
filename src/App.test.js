import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const title = screen.getByText(/Find out the latest git commit history/i);
  expect(title).toBeInTheDocument();
});

test("renders instructions", () => {
  render(<App />);
  const instructions = screen.getByText(/Enter a github user/i);
  expect(instructions).toBeInTheDocument();
});
