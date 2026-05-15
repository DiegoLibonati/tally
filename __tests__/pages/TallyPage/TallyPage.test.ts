import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import TallyPage from "@/pages/TallyPage/TallyPage";

const renderPage = (): Page => {
  const element = TallyPage();
  document.body.appendChild(element);
  return element;
};

describe("TallyPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render the main element with the tally-page class", () => {
      renderPage();

      const main = document.querySelector<HTMLElement>("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("tally-page");
    });

    it("should render the Counter heading", () => {
      renderPage();

      expect(
        screen.getByRole("heading", { name: "Counter", level: 2 })
      ).toBeInTheDocument();
    });

    it("should render the initial count as 0", () => {
      renderPage();

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0");
    });

    it("should render the Increase button", () => {
      renderPage();

      expect(
        screen.getByRole("button", { name: "Increase counter" })
      ).toBeInTheDocument();
    });

    it("should render the Decrease button", () => {
      renderPage();

      expect(
        screen.getByRole("button", { name: "Decrease counter" })
      ).toBeInTheDocument();
    });

    it("should render the Reset button", () => {
      renderPage();

      expect(
        screen.getByRole("button", { name: "Reset counter" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("increase", () => {
      it("should increment the count when Increase is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "1"
        );
      });

      it("should increment the count on each successive click", async () => {
        const user = userEvent.setup();
        renderPage();
        const increaseBtn = screen.getByRole("button", {
          name: "Increase counter",
        });

        await user.click(increaseBtn);
        await user.click(increaseBtn);
        await user.click(increaseBtn);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "3"
        );
      });
    });

    describe("decrease", () => {
      it("should decrement the count when Decrease is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "-1"
        );
      });

      it("should decrement the count on each successive click", async () => {
        const user = userEvent.setup();
        renderPage();
        const decreaseBtn = screen.getByRole("button", {
          name: "Decrease counter",
        });

        await user.click(decreaseBtn);
        await user.click(decreaseBtn);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "-2"
        );
      });
    });

    describe("reset", () => {
      it("should reset a positive count to 0 when Reset is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );
        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );
        await user.click(screen.getByRole("button", { name: "Reset counter" }));

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "0"
        );
      });

      it("should reset a negative count to 0 when Reset is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );
        await user.click(screen.getByRole("button", { name: "Reset counter" }));

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "0"
        );
      });
    });

    describe("color", () => {
      it("should apply green color when count is positive", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-green)");
      });

      it("should apply red color when count is negative", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-red)");
      });

      it("should apply black color when count is reset to zero from positive", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );
        await user.click(screen.getByRole("button", { name: "Reset counter" }));

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-black)");
      });

      it("should apply black color when count is reset to zero from negative", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );
        await user.click(screen.getByRole("button", { name: "Reset counter" }));

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-black)");
      });

      it("should apply black color when count returns to zero by increasing from negative", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );
        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-black)");
      });

      it("should apply black color when count returns to zero by decreasing from positive", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: "Increase counter" })
        );
        await user.click(
          screen.getByRole("button", { name: "Decrease counter" })
        );

        const numberEl =
          document.querySelector<HTMLHeadingElement>(".counter__number");
        expect(numberEl?.style.color).toBe("var(--color-black)");
      });
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const page = renderPage();

      expect(typeof page.cleanup).toBe("function");
    });

    it("should remove all click listeners and prevent count changes after cleanup", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      page.cleanup?.();
      await user.click(
        screen.getByRole("button", { name: "Increase counter" })
      );
      await user.click(
        screen.getByRole("button", { name: "Decrease counter" })
      );
      await user.click(screen.getByRole("button", { name: "Reset counter" }));

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0");
    });
  });
});
