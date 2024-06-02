import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
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
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import Logo from "../../components/logo";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../utils/orders";

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

function createData(imagen, order, precio, unidad, color) {
  return {
    imagen,
    order,
    precio,
    unidad,
    color,
  };
}

const Orders = ({ modifyTitle, search }) => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchOrders() {
    const datos = await getOrders();
    console.log(datos);
    setOrderCount(datos.length);
    setData(datos);
  }

  const handleMenuClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewOrder = (id) => {
    navigate("/admin/order/view/" + id);
    handleClose();
  };

  /**
   *
   * @param {String} str
   * @returns
   */
  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  };

  async function handleCompleteOrder(id) {
    let ok = confirm("¿Confirmas que este pedido ha sido completado?");
    if (ok) {
      const response = await completeProduct(id);
      if (!response) {
        alert("El pedido ha sido completado exitosamente");
        location.reload();
      } else {
        alert("No se pudo completar, vuelve a intentarlo");
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

  useEffect(() => modifyTitle("Pedidos"), []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <>
          <CircularProgress />
          {
            // Se extraen los pedidos
            fetchOrders()
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
                    Pedido
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Fecha
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Estado
                  </StyledHeaderTableCell>
                  <StyledHeaderTableCell align="center">
                    Total
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
                      : row.estado.toLowerCase().includes(search);
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <StyledBodyTableCell component="th" align="center">
                        {`#${row.id_pedido}`}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {new Date(Date.parse(row.fecha_pedido)).toLocaleString(
                          "es-co",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {toTitleCase(row.estado)}
                      </StyledBodyTableCell>
                      <StyledBodyTableCell align="center">
                        {`$${row.total}  para ${row.cantidad_productos} productos`}
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
                            onClick={() => handleViewOrder(row.id_pedido)}
                          >
                            <VisibilityIcon sx={{ mr: "0.5rem" }} /> Ver
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleCompleteOrder(row.id_pedido);
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
            count={orderCount}
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

export default Orders;
