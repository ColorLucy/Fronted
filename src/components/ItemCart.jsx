import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import numeral from "numeral";
import React, { useContext } from "react";
import homeColorLucyImg from "../../public/homeColorLucy1.png";
import { CartContext } from "../context/CartContext";

const stopPropagation = (event) => {
  event.stopPropagation();
};

export const ItemCart = ({ item }) => {
  const { deleteItemToCart, addItemToCart } = useContext(CartContext);
  const locat = window.location.pathname === "/carrito";
  const { id } = item;
  const total = parseFloat(item.precio);

  return (
    <CardActionArea
      href={`/productos/${encodeURIComponent(item.nombre)}-${item.producto}?unidad=${encodeURIComponent(item.unidad)}&color=${encodeURIComponent(item.color)}`}
    >
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={3} sm={2}>
        {/* Grid de la imagen del producto */}
        <CardContent sx={{ padding: "8px" }}>
          <CardMedia
            component="img"
            height="50px"
            src={
              item.imagenes.length > 0
                ? item.imagenes[0].url
                : homeColorLucyImg
            }
            loading="lazy"
            alt={item.nombre}
            sx={{ objectFit: "contain", width: "100%" }}
          />
        </CardContent>
      </Grid>
      <Grid item xs={5} sm={4}>
        {/* Grid para el nombre del producto */}
        <Typography fontSize={"14px"} noWrap>
          {item.nombre}
        </Typography>
        {locat && (
          <>
            <Typography fontSize={"10px"}>{item.color}</Typography>
            <Typography fontSize={"10px"}>{item.unidad}</Typography>
          </>
        )}
      </Grid>
      <Grid item xs={4} sm={3} sx={{ display: "flex", alignItems: "center" }}>
        {/* Grid para los botones y el contador */}
        <Box
            onClick={stopPropagation}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
        <Box
          onMouseDown={event => event.stopPropagation()}
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            addItemToCart(item);
          }}
          sx={{ marginLeft: "5px", color: "blue", cursor: "pointer" }}
        >
          <AddRoundedIcon />
        </Box>
        <Typography sx={{ margin: "0 10px", fontSize: "14px" }}>
          {item.amount}
        </Typography>
        <Box
          onMouseDown={event => event.stopPropagation()}
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            deleteItemToCart(item);
          }}
          sx={{ color: "blue", cursor: "pointer" }}
        >
          <RemoveRoundedIcon />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3} display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"14px"}>
          {numeral(item.amount * total).format("$0,0")}
        </Typography>
      </Grid>
    </Grid>
  </CardActionArea>
  );
};
