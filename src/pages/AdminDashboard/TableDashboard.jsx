import React from "react";
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
} from "@mui/material";
import { styled, Paper, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./TableDashboard.module.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/Theme";
import { consultarDetalles } from "../../api/Products";

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

const TableDashboard = () => {
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  console.log(search);
  const open = Boolean(anchorEl);

  async function obtenerProductos() {
    const config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.loginUser,
      },
      // body: JSON.stringify(data)
    };
    // console.log("config:", config)
    const datos = await consultarDetalles(config);
    console.log("Productos:", datos);

    let productosProcesados = [];
    for (let i = 0; i < datos.length; i++) {
      productosProcesados.push({
        producto: datos[i].nombre,
        precio: datos[i].precio,
        unidad: datos[i].unidad,
        color: datos[i].color,
      });
    }
    console.log("Productos Procesados:", productosProcesados);
    setData(productosProcesados);
  }

  const results = !search
    ? data
    : data.filter(
        (product) =>
          product.producto.toLowerCase().includes(search.toLocaleLowerCase()) ||
          product.unidad.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  const handleEditProduct = () => {
    window.open("http://localhost:5173", "_blank");
    handleClose();
  };

  const handleDeleteProduct = () => {
    window.open("http://localhost:5173", "_blank");
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <Button
          sx={{
            backgroundColor: "#C63CA2",
            color: "white",
            fontFamily: "Roboto",
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
        <Box sx={{ margin: "0 1rem" }} component={Paper}>
          <TableContainer
            sx={{ overflowX: "auto", borderRadius: "0.25rem" }}
            component={Paper}
          >
            <Table
              sx={{ minWidth: "auto" }}
              size="medium"
              aria-label="products table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledHeaderTableCell align="center">
                    Producto
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Precio
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Unidad
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Color
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Menu
                  </StyledHeaderTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {results
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.producto}>
                      <StyledBodyTableCell align="center">
                        {row.producto}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.precio}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.unidad}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {row.color}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        <IconButton
                          id="options-button"
                          onClick={handleMenuClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={() => handleViewProduct()}>
                            <VisibilityIcon sx={{ mr: "0.5rem" }} /> Ver
                          </MenuItem>
                          <MenuItem onClick={() => handleEditProduct()}>
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
            rowsPerPageOptions={[10, 25, 50, 100, -1]}
            component={Box}
            count={results.length}
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

export default TableDashboard;
