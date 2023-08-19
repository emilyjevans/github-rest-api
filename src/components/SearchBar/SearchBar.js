import { TextField } from "@mui/material";

function SearchBar({ user, setUser }) {
  return (
    <TextField
      type="text"
      placeholder="Search here"
      onChange={(e) => setUser(e.target.value)}
      variant="filled"
    />
  );
}

export default SearchBar;
