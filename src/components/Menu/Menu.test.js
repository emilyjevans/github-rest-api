import { render, screen } from "@testing-library/react";
import Menu from "./Menu";

describe("Menu component", () => {
  it("renders a menu", () => {
    const testData = [{ name: "test" }];

    render(<Menu data={testData} />);
    const menuElement = screen.getByRole("list");
    expect(menuElement).toBeInTheDocument();
  });

  it("renders uses the name from the data as options in the menu", () => {
    const testData = [{ name: "test" }];

    render(<Menu data={testData} />);
    const menuElement = screen.getByText(/test/);
    expect(menuElement).toBeInTheDocument();
  });
});
