import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import "./App.css";
import React from "react";
import { ProductCard } from "./components/ProductCard";
import { useProductStore } from "./store/productStore";

// Adicionar produtos, com os seguintes campos: Nome do produto, Imagem do produto e Categoria (ex: eletrónica, vestuário, alimentação) OK
// Remover produtos da lista
// Editar produtos, incluindo a opção de marcar como fora de stock
// Persistência de dados: os dados devem manter-se mesmo após refresh da página (ex: localStorage, IndexedDB ou outra solução) OK

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

function App() {
  const { products, addProduct } = useProductStore();
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

  return (
    <>
      <main>
        <Container maxWidth="lg" className="container">
          <h1>Gestão de Inventário de produtos</h1>

          <section className="add_product">
            <div className="form_wrapper">
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

            <div className="form_wrapper">
              <label htmlFor="image">Imagem</label>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
              >
                {imageFileName || "Nova Imagem"}
                <VisuallyHiddenInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const base64 = await convertToBase64(file);
                        setNewProductForm({
                          ...newProductForm,
                          image: base64,
                        });
                        setImageFileName(file.name);
                      } catch (error) {
                        console.error("Erro ao converter imagem:", error);
                      }
                    }
                  }}
                />
              </Button>
            </div>

            <div className="form_wrapper">
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

            <Button variant="contained" onClick={handleAddProduct}>
              Adicionar produto
            </Button>
          </section>

          <section className="product_list">
            {products.length !== 0
              ? products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : "Nenhum produto cadastrado!"}
          </section>
        </Container>
      </main>
    </>
  );
}

export default App;
