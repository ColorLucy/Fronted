import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";
import { deleteProduct } from "../../utils/crudProducts";
import { consultarProductos } from "../../utils/products";

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

const ProductDashboard = ({ modifyTitle, search }) => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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


  useEffect(() => modifyTitle("Productos"), [])
  const handleViewProduct = (nombre, id_producto) => {
    window.open(
      window.location.origin +
      `/productos/${encodeURIComponent(nombre)}-${id_producto}`
    );
    handleClose();
  };

  const handleEditProduct = (id) => {
    navigate("/admin/product/edit/" + id);
    handleClose();
  };

  async function handleDeleteProduct(id) {
    let ok = confirm("¿Confirmas la eliminación del producto?");
    if (ok) {
      const response = await deleteProduct(id);
      if (!response) {
        alert("El producto ha sido eliminado exitosamente");
        location.reload();
      } else {
        alert("Producto no eliminado, vuelve a intentarlo");
      }
    }
  }

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

      {loading ? (
        <>
          {
            // Se extraen los productos
            obtenerProductos()
          }
          {setLoading(false)}
        </>
      ) : (
        <Box sx={{}} component={Paper}>
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
                          <MenuItem
                            onClick={() =>
                              handleViewProduct(row.nombre, row.id_producto)
                            }
                          >
                            <VisibilityIcon sx={{ mr: "0.5rem" }} /> Ver
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleEditProduct(row.id_producto);
                            }}
                          >
                            <EditIcon sx={{ mr: "0.5rem" }} /> Editar
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDeleteProduct(row.id_producto);
                            }}
                          >
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
