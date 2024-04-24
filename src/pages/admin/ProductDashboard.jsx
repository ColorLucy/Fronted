import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  styled,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import styles from "./ProductDashboard.module.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { consultarDetalles, consultarProductos } from "../../utils/products";
import Logo from "../../components/logo";
import { useNavigate } from "react-router-dom";

const StyledHeaderTableCell = styled(TableCell)({
  color: "White",
});

const ImageTableCell = styled(TableCell)({
  padding: 0,
});

const StyledBodyTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: "#0367A6",
});

function createData(imagen, producto, precio, unidad, color) {
  return {
    imagen,
    producto,
    precio,
    unidad,
    color,
  };
}

const ProductDashboard = () => {
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [productCount, setProductCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate()

  async function obtenerProductos() {
    const datos = await consultarProductos();
    setProductCount(datos.length);    
    setData(datos);
  }

  const handleMenuClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddProduct = () => {
    window.open("http://localhost:5173", "_blank");
    handleClose();
  };

  const handleViewProduct = () => {
    window.open("http://localhost:5173", "_blank");
    handleClose();
  };

  const handleEditProduct = (id) => {
    navigate("/admin/edit/"+id);
    handleClose();
  };

  const handleDeleteProduct = () => {
    window.open("http://localhost:5173", "_blank");
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // obtenerProductos();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        ></TextField>
        <Button
          sx={{
            backgroundColor: "#C63CA2",
            color: "white",
            fontFamily: "Roboto",
            "&:hover": {
              backgroundColor: "#D7194A",
            },
          }}
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Añadir Producto
        </Button>
      </Box>
      {loading ? (
        <>
          {
            // Se extraen los productos
            obtenerProductos()
          }
          {setLoading(false)}
        </>
      ) : (
        <Box sx={{ margin: "0 2rem" }} component={Paper}>
          <TableContainer
            sx={{ overflowX: "auto", borderRadius: "0.25rem" }}
            component={Paper}
          >
            <Table
              sx={{ minWidth: "auto" }}
              size="small"
              aria-label="products table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledHeaderTableCell align="center">
                    ID
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Producto
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Fabricante
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Descripción
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Menu
                  </StyledHeaderTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter((row) => {
                    return search.toLowerCase() === ""
                      ? row
                      : row.nombre.toLowerCase().includes(search);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <StyledBodyTableCell component="th" align="center">
                        {row.id_producto}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.nombre}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.fabricante}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.descripcion}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        <IconButton
                          id="options-button"
                          onClick={(event) => handleMenuClick(index, event)}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl && anchorEl[index]}
                          open={Boolean(anchorEl) && Boolean(anchorEl[index])}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={() => handleViewProduct()}>
                            <VisibilityIcon sx={{ mr: "0.5rem" }} /> Ver
                          </MenuItem>
                          <MenuItem onClick={() => {handleEditProduct(row.id_producto)}}>
                            <EditIcon sx={{ mr: "0.5rem" }} /> Editar
                          </MenuItem>
                          <MenuItem onClick={() => handleDeleteProduct()}>
                            <DeleteForeverIcon sx={{ mr: "0.5rem" }} /> Eliminar
                          </MenuItem>
                        </Menu>
                      </StyledBodyTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#D7194A",
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  color: "white",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginTop: "1rem",
                },
              ".MuiTablePagination-select, .MuiTablePagination-actions": {
                fontFamily: "Roboto",
                borderRadius: "5px",
                backgroundColor: "white",
              },
            }}
            rowsPerPageOptions={[
              5,
              10,
              25,
              50,
              100,
              { label: "All", value: -1 },
            ]}
            component={"div"}
            count={productCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ProductDashboard;
