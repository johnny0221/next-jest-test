import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Counter } from "./Counter";
import React from "react";
import user from "@testing-library/user-event";

// * group the test with describe to make it as a story to read

// create a situation where the component will be initialized as the follow.
describe("initialized with defaultCount = 0 and description = My Counter", () => {
  beforeEach(() => {
    render(<Counter defaultCount={0} description="My Counter" />);
  });

  it("renders CurrentCount: 0", () => {
    expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
  });

  it("renders the My Counter title inside the h2 tag", () => {
    expect(screen.getByText(/My Counter/i)).toBeInTheDocument();
  });

  describe("when + button is clicked", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "increment" }));
    });
    // the page will have a text of "Current Count: 1"
    it("default count = 0 and clicked + counter = 1", async () => {
      const text = await screen.findByText("Current Count: 1");
      await waitFor(() => expect(text).toBeInTheDocument());
    });
  });

  describe("when - button is clicked", () => {
    beforeEach(() => {
      // 2. simulate the user clicks the minus button
      fireEvent.click(screen.getByRole("button", { name: "decrement" }));
    });
    it("default count = 0 and clicked - counter = -1", () => {
      // 3. check for the UI if meets your expectation
      expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
    });
  });
});

describe("Initialized with default count = 10 and description = WWW", () => {
  beforeEach(() => {
    render(<Counter defaultCount={10} description="WWW" />);
  });

  it("renders CurrentCount: 10", () => {
    expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
  });

  it('renders the "WWW" title inside the h2 tag', () => {
    expect(screen.getByText(/WWW/i)).toBeInTheDocument();
  });

  describe("when the incrementor changes to 5", () => {
    beforeEach(async () => {
      user.type(screen.getByLabelText("incrementInput"), "{selectall}5");
      user.click(screen.getByRole("button", { name: "increment" }));
      await screen.findByText("Current Count: 15");
    });

    it("renders Current Count: 15", () => {
      // run the callback multiple times until reaches the timeout.
      expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
    });

    it('the content "Hello big enough to show" will disappear on screen', async () => {
      await waitForElementToBeRemoved(() =>
        screen.queryByText("Hello small enough to show")
      );
      expect(
        screen.queryByText("Hello small enough to show")
      ).not.toBeInTheDocument();
    });

    describe("when the incrementor changes to an empty string and + was clicked", () => {
      beforeEach(async () => {
        user.type(screen.getByLabelText("incrementInput"), "{selectall}1");
        user.click(screen.getByRole("button", { name: "increment" }));
        await screen.findByText("Current Count: 16");
      });

      it("render Current Count: 16", () => {
        expect(screen.getByText("Current Count: 16")).toBeInTheDocument();
      });
    });
  });
});

// maybe we will have another situation in the future initializing the component in another way like "defaultCount of 1"
// we can create another section to test that
