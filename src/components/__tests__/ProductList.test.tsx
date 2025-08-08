import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { ProductList } from "../ProductList";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../../store/Product/productStore", () => ({
  useProductStore: () => ({
    products: [
      {
        id: 1,
        name: "Produto1",
        category: "alimentacao",
        image: "",
        available: true,
      },
    ],
  }),
}));

describe("<ProductList />", () => {
  it("Should close modal when click 'cancel' button", async () => {
    render(<ProductList />);

    fireEvent.click(screen.getByRole("button", { name: /editar/i }));

    const modal = document.querySelector(
      ".modal_addProduct__content"
    ) as HTMLDivElement;

    expect(modal).toBeInTheDocument();
    expect(modal).not.toBeNull();

    const cancelButton = within(modal!).getByRole("button", {
      name: /cancelar/i,
    });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });
});
