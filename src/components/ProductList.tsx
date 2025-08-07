import { useProductStore } from "../store/Product/productStore";
import type { ProductProps } from "../store/Product/types";
import { ProductCard } from "./ProductCard";

export const ProductList: React.FC = () => {
  const { products } = useProductStore();

  return (
    <section className="product-list">
      {products.length !== 0 ? (
        products.map((product: ProductProps) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="product-list__empty">Nenhum produto cadastrado!</p>
      )}
    </section>
  );
};
