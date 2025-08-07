import { create } from "zustand";
import type { ProductState } from "./Product/types";
import { persist, devtools } from "zustand/middleware";

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
      }),
      { name: "products" }
    )
  )
);
