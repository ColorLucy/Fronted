import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import homeColorLucyImg from "../../public/homeColorLucy1.png";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import numeral from "numeral";
import { Grid } from "@mui/material";
import { blue } from "@mui/material/colors";

export const ItemCart = ({ item }) => {
  const { deleteItemToCart, addItemToCart } = useContext(CartContext);

  const { id } = item;
  const total = parseFloat(item.detalles[0].precio);

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
                  item.detalles[0].imagenes.length > 0
                    ? item.detalles[0].imagenes[0].url
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
            <Typography>{item.nombre}</Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex" }}>
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
          <Grid item xs={2}>
            <Typography>
              {numeral(item.amount * total).format("$0,0")}
            </Typography>
          </Grid>
        </CardActionArea>
      </Grid>
    </Grid>
  );
};
