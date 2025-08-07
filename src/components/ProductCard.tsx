import { Box, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProductCardProps, ProductProps } from "../store/Product/types";
import React from "react";
import { useProductStore } from "../store/Product/productStore";
import { ModalEditProduct } from "./ModalEditProduct";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { deleteProduct, editProduct } = useProductStore();

  const [open, setOpen] = React.useState(false);
  const [editedProduct, setEditedProduct] = React.useState<ProductProps>({
    id: product.id,
    name: product.name,
    image: product.image,
    category: product.category,
    available: product.available ?? true,
  });

  const handleOpen = () => {
    setEditedProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      available: product.available ?? true,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  const handleSubmit = () => {
    editProduct(editedProduct);
    setOpen(false);
  };

  return (
    <div className="product-item">
      <Box
        component="img"
        className="product-item__image"
        src={product.image ? product.image : "https://placehold.co/200"}
        alt={product.name}
        sx={{ height: 200 }}
        loading="lazy"
      />

      <div className="product-item__content">
        <h5 className="product-item__name">{product.name}</h5>

        <p className="product-item__category">{product.category}</p>

        <Typography
          variant="body2"
          gutterBottom
          className={`product-item__status ${
            product.available
              ? "product-item__status--available"
              : "product-item__status--unavailable"
          }`}
          sx={{
            color: product.available ? "success.main" : "error.main",
            fontWeight: "bold",
          }}
        >
          {product.available ? "Disponível" : "Fora de estoque"}
        </Typography>
      </div>

      <div
        color="error"
        onClick={() => handleDeleteProduct(product.id)}
        className="product-item__delete"
      >
        <DeleteIcon sx={{ color: "white" }} />
      </div>

      <div className="product-item__edit">
        <EditIcon sx={{ color: "white" }} onClick={handleOpen} />

        <ModalEditProduct
          open={open}
          setEditedProduct={setEditedProduct}
          onSubmit={handleSubmit}
          handleClose={handleClose}
          editedProduct={editedProduct}
        />
      </div>
    </div>
  );
};
