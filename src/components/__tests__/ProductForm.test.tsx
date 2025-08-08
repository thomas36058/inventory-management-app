import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { ProductForm } from "../ProductForm";

vi.mock("../store/Product/productStore", () => ({
  useProductStore: vi.fn(),
}));

describe("ProductForm - handleAddProduct", () => {
  const mockAddProduct = vi.fn();

  it("should add a new product with the filled data when button is clicked", () => {
    render(<ProductForm />);

    const nameInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nameInput, { target: { value: "Camiseta" } });

    const categorySelect = screen.getByLabelText(/categoria/i);
    fireEvent.mouseDown(categorySelect);
    const option = screen.getByText(/Vestuário/i);
    fireEvent.click(option);

    const addButton = screen.getByRole("button", {
      name: /adicionar produto/i,
    });
    fireEvent.click(addButton);
  });

  it("should not call addProduct if name is empty", () => {
    render(<ProductForm />);

    const button = screen.getByRole("button", { name: /adicionar produto/i });
    fireEvent.click(button);

    expect(mockAddProduct).not.toHaveBeenCalled();
  });
});
