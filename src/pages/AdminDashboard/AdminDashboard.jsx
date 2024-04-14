import { Box, Button, TextField, InputAdornment } from "@mui/material";
import TableDashboard from "./TableDashboard";
import styles from "./AdminDashboard.module.css";
import AddIcon from "@mui/icons-material/Add";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/Theme";
import SearchIcon from "@mui/icons-material/Search";

const AdminDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <h3 className={`${styles.dashboardTitle}`}>Dashboard</h3>
          <TextField
            color="lucy_yellow"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder={"Buscar"}
          ></TextField>
          <Button
            sx={{
              backgroundColor: "#C63CA2",
              color: "white",
              fontFamily: "Roboto",
            }}
            startIcon={<AddIcon />}
          >
            Añadir Producto
          </Button>
        </Box>
        <Box>
          <TableDashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
