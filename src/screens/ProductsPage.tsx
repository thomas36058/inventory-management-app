import React from "react";
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { useProductStore } from "../store/Product/productStore";
import { ProductFilter } from "../components/ProductFilter";

export const ProductsPage: React.FC = () => {
  const { products } = useProductStore();
  const [searchText, setSearchText] = React.useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <h1 className="inventory__title">Gestão de Inventário de Produtos</h1>

      <ProductForm />

      <ProductFilter searchText={searchText} setSearchText={setSearchText} />

      <ProductList productsList={filteredProducts} />
    </>
  );
};
