import { render, screen, cleanup, waitFor } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App tests", () => {
  it("should render App", () => {
    render(<App />);
    expect(App).toBeTruthy();
  });

  it("should contain toggle btn", () => {
    render(<App />);
    const toggleBtn = screen.getByText("Order Food");
    expect(toggleBtn).toBeTruthy();
  });

  it("should display title and subtitle", () => {
    render(<App />);
    const title = screen.getByText("Just Food Online Shop");
    const subTitle = screen.getByText("Menu Availability");
    expect(title).toBeTruthy();
    expect(subTitle).toBeTruthy();
    expect(title).toBeInTheDocument();
  });

  it("should contain food elements", () => {
    render(<App />);
    const foodEl = screen.getByTestId("food-el");
    expect(foodEl).toHaveTextContent("Arepa");
  });

  describe("When an user clicks on Order Food button", () => {
    beforeEach(() => {
      render(<App />);
    });
    it("should render food list", async () => {
      const toggleBtn = screen.getByText("Order Food");
      userEvent.click(toggleBtn);
      expect(await screen.findByText("Choose from our Menu")).toBeVisible();
      expect(
        await screen.findByText(
          "Fried chicken burger - lettuce, tomato, cheese and mayonnaise"
        )
      ).toBeVisible();
      expect(await screen.findByText("24$")).toBeVisible();
    });
    describe("When an user selects a food from the menu", () => {
      it("should display food details", async () => {
        const toggleBtn = screen.getByText("Order Food");
        await userEvent.click(toggleBtn);
        expect(screen.getByAltText("Chicken Burger")).toBeVisible();

        const selectedFoodEl = await waitFor(() =>
          userEvent.click(screen.getAllByTestId("food-el-list")[0])
        );
        userEvent.click(selectedFoodEl);
        expect(screen.getByTestId("sel-food-title")).toBeVisible();
        expect(
          screen.getByText(
            "Fried chicken burger - lettuce, tomato, cheese and mayonnaise"
          )
        ).toBeVisible();
        expect(screen.getByText("24$")).toBeVisible();
        expect(screen.getByTestId("sel-item-qty")).toBeVisible();
        expect(screen.getByRole("button", { name: "Submit Order" }));
        expect(screen.getByRole("button", { name: "Return to Menu" }));
      });

      it("should submit order", async () => {
        const toggleBtn = screen.getByText("Order Food");
        await userEvent.click(toggleBtn);
        expect(screen.getByAltText("Chicken Burger")).toBeVisible();
        const selectedFoodEl = await waitFor(() =>
          userEvent.click(screen.getAllByTestId("food-el-list")[0])
        );
        userEvent.click(selectedFoodEl);
        expect(screen.getByRole("button", { name: "Submit Order" }));

        await waitFor(() =>
          userEvent.click(screen.getByTestId("submit-order-btn"))
        );
        expect(await screen.getByTestId("order-submited-msg")).toBeVisible();
      });

      it("should return to menu after clicking on retun button", async () => {
        const toggleBtn = screen.getByText("Order Food");
        await userEvent.click(toggleBtn);
        expect(screen.getByAltText("Chicken Burger")).toBeVisible();
        const selectedFoodEl = await waitFor(() =>
          userEvent.click(screen.getAllByTestId("food-el-list")[0])
        );
        userEvent.click(selectedFoodEl);

        const returnToMenuBtn = userEvent.click(
          screen.getByTestId("return-to-menu-btn")
        );
        expect(screen.returnToMenuBtn).toBeFalsy();
      });

      it("should go back to availability check aftern click on button", async () => {
        const toggleBtn = screen.getByText("Order Food");
        await userEvent.click(toggleBtn);
        expect(screen.getByAltText("Chicken Burger")).toBeVisible();
        const selectedFoodEl = await waitFor(() =>
          userEvent.click(screen.getAllByTestId("food-el-list")[0])
        );
        userEvent.click(selectedFoodEl);

        const availabilityCheckBtn = await waitFor(() =>
          userEvent.click(screen.getByText("Availability Check"))
        );
        expect(screen.availabilityCheckBtn).toBeFalsy();
        expect(await screen.getByText("Menu Availability")).toBeVisible();
      });
    });
  });

  describe("should match snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    cleanup();
  });
});
