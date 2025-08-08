import "@testing-library/jest-dom";
import { vi } from "vitest";
import { useProductStore } from "../productStore";
import type { ProductProps, ProductState } from "../types";

describe("productStore", () => {
  it("Should add new product and call addProduct action", () => {
    vi.spyOn(Date, "now").mockReturnValue(123456);

    const { addProduct } = useProductStore.getState();

    addProduct({
      name: "Camiseta",
      image: "thomas",
      category: "vestuario",
      available: true,
    });

    type ProductOnlyState = Pick<ProductState, "products">;
    const expectedState: ProductOnlyState = {
      products: [
        {
          id: 123456,
          name: "Camiseta",
          image: "thomas",
          category: "vestuario",
          available: true,
        },
      ],
    };

    expect(useProductStore.getState()).toMatchObject(expectedState);
  });

  it("Should delete a product when click on delete Button", () => {
    const mockProduct: ProductProps = {
      id: 123456,
      name: "Camiseta",
      image: "thomas",
      category: "vestuario",
      available: true,
    };

    useProductStore.setState({
      products: [mockProduct],
    });

    const { deleteProduct } = useProductStore.getState();

    deleteProduct(123456);

    expect(useProductStore.getState().products).toEqual([]);
  });

  it("Should edit a product when click on edit button", () => {
    const mockProduct: ProductProps = {
      id: 1234567,
      name: "Camiseta",
      image: "thomas",
      category: "vestuario",
      available: true,
    };

    useProductStore.setState({
      products: [mockProduct],
    });

    const { addProduct, editProduct } = useProductStore.getState();

    vi.spyOn(Date, "now").mockReturnValue(123456);
    addProduct({
      name: "Camiseta",
      image: "thomas",
      category: "vestuario",
      available: true,
    });

    editProduct({
      id: 1234567,
      name: "Blusa",
      image: "blusa",
      category: "vestuario",
      available: false,
    });

    type ProductOnlyState = Pick<ProductState, "products">;
    const expectedState: ProductOnlyState = {
      products: [
        {
          id: 1234567,
          name: "Blusa",
          image: "blusa",
          category: "vestuario",
          available: false,
        },
        {
          id: 123456,
          name: "Camiseta",
          image: "thomas",
          category: "vestuario",
          available: true,
        },
      ],
    };

    expect(useProductStore.getState()).toMatchObject(expectedState);
  });
});
