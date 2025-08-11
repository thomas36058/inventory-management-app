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
  editProduct: (product: ProductProps) => void;
}

export interface ProductCardProps {
  key: number;
  product: ProductProps;
}

export type ModalEditProductProps = {
  open: boolean;
  editedProduct: Omit<ProductProps, "id">;
  handleClose: () => void;
  setEditedProduct: React.Dispatch<
    React.SetStateAction<Omit<ProductProps, "id">>
  >;
  onSubmit: () => void;
};

export interface ProductListProps {
  productsList: ProductProps[];
}
