import { Container } from "@mui/material";
import "./App.css";
import { ProductsPage } from "./screens/ProductsPage";

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
