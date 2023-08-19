import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("Menu component", () => {
  it("renders a searchbar", () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByRole("textbox");
    expect(searchBarElement).toBeInTheDocument();
  });

  it("renders search bar with placeholder text", () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByRole("textbox");
    expect(searchBarElement).toHaveAttribute("placeholder", "Search here");
  });
});
