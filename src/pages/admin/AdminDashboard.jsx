import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import Logo from "../../components/logo";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        <Logo imgSize={40} minLen={true} />
        <Button
          id="return-button"
          color="lucy_pink"
          variant="contained"
          startIcon={<ReplyIcon />}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.lucy_red.main,
            },
          }}
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <h1 style={{ color: "#0AA64D" }}>Admin</h1>
        <Button
          id="view-products-button"
          color="lucy_blue"
          variant="contained"
          sx={{ color: "white", margin: "2rem 0 1rem 0" }}
          onClick={() => navigate("/admin/products/")}
        >
          Ver Productos
        </Button>
        <Button
          id="view-products-button"
          color="lucy_blue"
          variant="contained"
          sx={{ color: "white", margin: "1rem 0" }}
          onClick={() => navigate("/admin/orders/")}
        >
          Ver Pedidos
        </Button>
        <Button
          id="view-products-button"
          color="lucy_blue"
          variant="contained"
          sx={{ color: "white", margin: "1rem 0" }}
          onClick={() => navigate("/admin/home/edit")}
        >
          Editar Página de Inicio
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
