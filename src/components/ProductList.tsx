import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useProductStore } from "../store/Product/productStore";
import type { ProductProps } from "../store/Product/types";
import React from "react";
import { ModalEditProduct } from "./ModalEditProduct";

export const ProductList: React.FC = () => {
  const { products, deleteProduct, editProduct } = useProductStore();
  const [open, setOpen] = React.useState(false);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editedProduct, setEditedProduct] = React.useState({
    name: "",
    image: "",
    category: "",
    available: true,
  });

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (editingId === null) return;

    editProduct({
      id: editingId,
      ...editedProduct,
    });
    setOpen(false);
  };

  const handleOpen = (product: ProductProps) => {
    setEditingId(product.id);
    setEditedProduct({
      name: product.name,
      category: product.category,
      image: product.image,
      available: product.available ?? true,
    });
    setOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <section className="product-list">
      {products.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Imagem</TableCell>
                <TableCell>Disponível</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: ProductProps) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={product.image || "https://placehold.co/20"}
                      alt={product.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ color: product.available ? "green" : "red" }}
                  >
                    {product.available ? "Em estoque" : "Fora de estoque"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpen(product)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="product-list__empty">Nenhum produto cadastrado!</p>
      )}

      <ModalEditProduct
        open={open}
        setEditedProduct={setEditedProduct}
        onSubmit={handleSubmit}
        handleClose={handleClose}
        editedProduct={editedProduct}
      />
    </section>
  );
};
