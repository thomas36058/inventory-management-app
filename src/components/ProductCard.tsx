import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useProductStore } from "../store/productStore";

import EditIcon from "@mui/icons-material/Edit";
import type { ProductCardProps } from "../store/Product/types";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <div className="product_item">
      <Box
        component="img"
        src={product.image ? product.image : "https://placehold.co/200"}
        alt={product.name}
        sx={{ height: 200, objectFit: "cover", borderRadius: 1 }}
        loading="lazy"
      />

      <h5>{product.name}</h5>

      <p>{product.category}</p>

      <span>Disponível</span>

      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteProduct(product.id)}
      >
        Deletar
      </Button>

      <div className="edit_product">
        <EditIcon sx={{ color: "white" }} onClick={handleOpen} />

        <Modal
          className="modal_addProduct"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar {product.name}
            </Typography>

            <form>
              <FormControl fullWidth margin="normal">
                <TextField required variant="standard" value={product.name} />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Box
                  component="img"
                  src={product.image && product.image}
                  alt={product.name}
                  sx={{
                    height: 250,
                    mb: 3,
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                >
                  Nova Imagem
                  <VisuallyHiddenInput type="file" accept="image/*" />
                </Button>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="product-category">Categoria</InputLabel>
                <Select
                  labelId="product-category"
                  label="Categoria"
                  value={product.category}
                >
                  <MenuItem value="">
                    <em>Selecione uma categoria</em>
                  </MenuItem>
                  <MenuItem value="eletronica">Eletrónica</MenuItem>
                  <MenuItem value="vestuario">Vestuário</MenuItem>
                  <MenuItem value="alimentacao">Alimentação</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Fora de estoque"
                />
              </FormControl>

              <Box mt={2} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained">
                  Salvar
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
