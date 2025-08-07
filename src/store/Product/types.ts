export interface ProductProps {
  id: number;
  name: string;
  category: string;
  image: string;
  available: boolean;
}

export interface ProductState {
  products: ProductProps[];
  addProduct: (product: Omit<ProductProps, "id">) => void;
  deleteProduct: (id: number) => void;
}

export interface ProductCardProps {
  key: number;
  product: ProductProps;
}
