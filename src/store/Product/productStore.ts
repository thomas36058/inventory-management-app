import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { ProductState } from "./types";

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        products: [],

        addProduct: (product) =>
          set((state) => ({
            products: [...state.products, { ...product, id: Date.now() }],
          })),

        deleteProduct: (id) =>
          set((state) => ({
            products: state.products.filter((product) => id !== product.id),
          })),

        editProduct: (updatedProduct) => {
          set((state) => {
            const updatedList = state.products.map((product) =>
              product.id === updatedProduct.id
                ? { ...product, ...updatedProduct }
                : product
            );
            localStorage.setItem("products", JSON.stringify(updatedList));
            return { products: updatedList };
          });
        },
      }),
      { name: "products" }
    )
  )
);
