import { Container } from "@mui/material";
import "./App.css";
import { ProductsPage } from "./screens/ProductsPage";

// Adicionar produtos, com os seguintes campos: Nome do produto, Imagem do produto e Categoria (ex: eletrónica, vestuário, alimentação) OK
// Remover produtos da lista
// Editar produtos, incluindo a opção de marcar como fora de stock
// Persistência de dados: os dados devem manter-se mesmo após refresh da página (ex: localStorage, IndexedDB ou outra solução) OK

function App() {
  return (
    <>
      <main className="inventory">
        <Container maxWidth="lg" className="container">
          <ProductsPage />
        </Container>
      </main>
    </>
  );
}

export default App;
