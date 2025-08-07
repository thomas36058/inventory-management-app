import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useProductStore } from "../store/Product/productStore";
import React from "react";

export const ProductForm: React.FC = () => {
  const { addProduct } = useProductStore();
  const [newProductForm, setNewProductForm] = React.useState({
    name: "",
    image: "",
    category: "default",
  });
  const [imageFileName, setImageFileName] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleAddProduct = () => {
    if (!newProductForm.name || !newProductForm.category) return;

    addProduct({
      name: newProductForm.name,
      image: newProductForm.image,
      category: newProductForm.category,
      available: true,
    });

    setNewProductForm({ name: "", image: "", category: "default" });
    setImageFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      setNewProductForm((prev) => ({
        ...prev,
        image: base64,
      }));
      setImageFileName(file.name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="inventory__add-product add-product">
      <div className="add-product__field">
        <TextField
          required
          label="Nome"
          variant="standard"
          value={newProductForm.name}
          onChange={(e) =>
            setNewProductForm({ ...newProductForm, name: e.target.value })
          }
        />
      </div>

      <div className="add-product__field">
        <label htmlFor="image" className="add-product__label">
          Imagem
        </label>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          className="add-product__button"
        >
          {imageFileName || "Nova Imagem"}
          <input
            type="file"
            accept="image/*"
            className="input--visually-hidden"
            ref={fileInputRef}
            onChange={getImagePath}
          />
        </Button>
      </div>

      <div className="add-product__field">
        <FormControl variant="standard" sx={{ minWidth: 220 }}>
          <InputLabel id="product-category">Categoria</InputLabel>
          <Select
            labelId="product-category"
            value={newProductForm.category}
            label="Categoria"
            onChange={(e) =>
              setNewProductForm({
                ...newProductForm,
                category: e.target.value,
              })
            }
          >
            <MenuItem value="default">
              <em>Selecione uma categoria</em>
            </MenuItem>
            <MenuItem value="eletronica">Eletrónica</MenuItem>
            <MenuItem value="vestuario">Vestuário</MenuItem>
            <MenuItem value="alimentacao">Alimentação</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        variant="contained"
        onClick={handleAddProduct}
        className="add-product__submit"
      >
        Adicionar produto
      </Button>
    </section>
  );
};
