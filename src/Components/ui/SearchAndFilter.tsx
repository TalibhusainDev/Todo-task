import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchAndFilterProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <Box my={4} sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      <TextField
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#757575" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          minWidth: 300,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel
          sx={{
            "&.MuiInputLabel-root": {
              color: "#666",
            },
          }}
        >
          Filter
        </InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          label="Status"
          sx={{
            borderRadius: 3,
            backgroundColor: "#fff",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
            "&.Mui-focused": {
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndFilter;
