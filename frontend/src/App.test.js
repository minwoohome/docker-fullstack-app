import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const saveButton = screen.getByText(/저장/i);
  expect(saveButton).toBeInTheDocument();
});
