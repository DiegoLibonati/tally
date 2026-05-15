import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ActionProps } from "@/types/props";
import type { ActionComponent } from "@/types/components";

import Action from "@/components/Action/Action";

const mockOnClick = jest.fn();

const defaultProps: ActionProps = {
  id: "action-btn",
  ariaLabel: "Click me",
  className: "primary",
  children: "Click",
  onClick: mockOnClick,
};

const renderComponent = (props: Partial<ActionProps> = {}): ActionComponent => {
  const element = Action({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Action", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveAttribute("id", "action-btn");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();

      expect(
        screen.getByRole("button", { name: "Click me" })
      ).toBeInTheDocument();
    });

    it("should apply the action class and the given className", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveClass("action", "primary");
    });

    it("should set the button type to button", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render the children as inner content", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveTextContent("Click");
    });
  });

  describe("behavior", () => {
    it("should call onClick when the button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole("button"));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick on each successive click", async () => {
      const user = userEvent.setup();
      renderComponent();
      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it("should not call onClick when not clicked", () => {
      renderComponent();

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should render empty content when children is undefined", () => {
      renderComponent({ children: undefined! });

      expect(screen.getByRole("button")).toHaveTextContent("");
    });

    it("should apply only the action class when className is undefined", () => {
      renderComponent({ className: undefined! });

      expect(screen.getByRole("button")).toHaveClass("action");
      expect(screen.getByRole("button")).not.toHaveClass("undefined");
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const element = renderComponent();

      expect(typeof element.cleanup).toBe("function");
    });

    it("should remove the click listener after cleanup is called", async () => {
      const user = userEvent.setup();
      const element = renderComponent();

      element.cleanup?.();
      await user.click(screen.getByRole("button"));

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
