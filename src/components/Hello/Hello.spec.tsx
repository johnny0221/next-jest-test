import { render, screen } from "@testing-library/react";
import Hello from "./Hello";
import React from "react";

it("renders Hello world", () => {
  render(<Hello />);
  const myElement = screen.getByText(/Hello world/);
  expect(myElement).toBeInTheDocument();
});
