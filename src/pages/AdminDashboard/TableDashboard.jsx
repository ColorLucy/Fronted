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
  IconButton,
} from "@mui/material";
import { styled, Paper, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LIJA from "/images/LIJA_SECA_TODAS.webp";
import styles from "./TableDashboard.module.css";

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

const rows = [
  createData(
    <img className={`${styles.productImage}`} src={LIJA}></img>,
    "Lija Seco 320",
    "2200",
    "Unidad",
    "NA"
  ),
  createData(
    <img className={`${styles.productImage}`} src={LIJA}></img>,
    "Lija Seco 400",
    "2200",
    "Unidad",
    "NA"
  ),
  createData(
    <img className={`${styles.productImage}`} src={LIJA}></img>,
    "Lija Seco 80",
    "2200",
    "Unidad",
    "NA"
  ),
];

const TableDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <StyledHeaderTableCell align="center" width={100}>
                Imagen
              </StyledHeaderTableCell>
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
              <StyledHeaderTableCell align="center">Menu</StyledHeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.imagen}>
                  <ImageTableCell align="center">{row.imagen}</ImageTableCell>
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
        rowsPerPageOptions={[1, 3, 7]}
        component={Box}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TableDashboard;
