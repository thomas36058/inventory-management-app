import React from "react";
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";

export const ProductsPage: React.FC = () => {
  return (
    <>
      <h1 className="inventory__title">Gestão de Inventário de Produtos</h1>

      <ProductForm />

      <ProductList />
    </>
  );
};
