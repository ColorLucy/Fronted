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

export const ItemCart = ({ item }) => {
  const { deleteItemToCart, addItemToCart } = useContext(CartContext);
  const locat = window.location.pathname === "/carrito";
  const { id } = item;
  const total = parseFloat(item.precio);

  return (
    <Grid container>
      <Grid item xs={12}>
        <CardActionArea sx={{ display: "flex" }}>
          <Grid item xs={3}>
            {" "}
            {/* Grid de la imagen del producto*/}
            <CardContent>
              <CardMedia
                component="img"
                height="50px"
                width="80px !important"
                src={
                  item.imagenes.length > 0
                    ? item.imagenes[0].url
                    : homeColorLucyImg
                }
                loading="lazy"
                alt={item.nombre}
                sx={{ objectFit: "contain" }}
              />
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            {" "}
            {/*grid para el nombre del producto */}
            <Typography fontSize={"15px"}>
              {!locat && item.nombre.length > 18
                ? item.nombre.slice(0, 18) + "..."
                : item.nombre}
            </Typography>
            {locat && (
              <>
                <Typography fontSize={"10px"}>{item.color}</Typography>
                <Typography fontSize={"10px"}>{item.unidad}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={3} sx={{ display: "flex" }}>
            {" "}
            {/*grid para los botones y el contador */}
            <Box
              onClick={() => addItemToCart(item)}
              sx={{ marginLeft: "15px", color: "blue" }}
            >
              <AddRoundedIcon />
            </Box>
            <Typography alignSelf={"center"} sx={{ margin: "0px 15px 0 15px" }}>
              {item.amount}
            </Typography>
            <Box onClick={() => deleteItemToCart(item)} sx={{ color: "blue" }}>
              <RemoveRoundedIcon />
            </Box>
          </Grid>
          <Grid item xs={3} display={"flex"} justifyContent={"center"}>
            <Typography>
              {numeral(item.amount * total).format("$0,0")}
            </Typography>
          </Grid>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};
