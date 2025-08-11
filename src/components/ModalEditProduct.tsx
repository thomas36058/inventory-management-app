import React from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import type { ModalEditProductProps } from "../store/Product/types";

export const ModalEditProduct: React.FC<ModalEditProductProps> = ({
  open,
  editedProduct,
  handleClose,
  setEditedProduct,
  onSubmit,
}) => {
  return (
    <Modal
      className="modal_addProduct"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal_addProduct__content">
        <Typography variant="h6" gutterBottom>
          Editar produto - {editedProduct.name}
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <FormControl fullWidth margin="normal">
            <TextField
              required
              variant="standard"
              value={editedProduct.name}
              onChange={(e) => {
                setEditedProduct({
                  ...editedProduct,
                  name: e.target.value,
                });
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Box
              component="img"
              src={editedProduct.image || "https://placehold.co/200"}
              alt={editedProduct.name}
              sx={{
                height: 250,
                mb: 3,
                objectFit: "contain",
              }}
              loading="lazy"
            />
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
            >
              Selecionar Nova Imagem
              <input
                type="file"
                accept="image/*"
                className="input--visually-hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditedProduct((prev) => ({
                        ...prev,
                        image: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="product-category">Categoria</InputLabel>
            <Select
              labelId="product-category"
              label="Categoria"
              value={editedProduct.category}
              onChange={(e) => {
                setEditedProduct({
                  ...editedProduct,
                  category: e.target.value,
                });
              }}
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
              control={
                <Checkbox
                  checked={!editedProduct.available}
                  onChange={(_, checked) => {
                    setEditedProduct({
                      ...editedProduct,
                      available: !checked,
                    });
                  }}
                />
              }
              label="Fora de estoque"
              checked={!editedProduct.available}
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
  );
};
