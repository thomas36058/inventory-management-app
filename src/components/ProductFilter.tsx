import { TextField } from "@mui/material";

interface ProductFilterProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
    <div className="product-filter">
      <TextField
        label="Encontre um produto"
        variant="standard"
        name="filter"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};
