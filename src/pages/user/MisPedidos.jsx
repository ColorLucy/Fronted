import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ItemCart } from "../../components/ItemCart";
import numeral from "numeral";
import {
  Box,
  Grid,
  Divider,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./shoppingcart.css";

const MisPedidos = () => {
    const [productsLength, setProductsLength] = useState(0);
  const [userName, setUserName] = useState("");
  const { cartItems } = useContext(CartContext);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previous, current) =>
      previous + current.amount * parseFloat(current.precio),
    0
  );


    return (
        
    <Box sx={{ minHeight: "calc(100dvh - 200px)" }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "15px 50px 0 10px",
        width: "95%",
      }}
    >
      <Typography sx={{ cursor: "not-allowed" }}>
        ITEMS: {productsLength}
      </Typography>
    </Box>
    <Divider variant="middle" sx={{ margin: "0 10px 15px 10px" }} />
    {cartItems.length === 0 ? (
      <Typography className="cartNull" color="GrayText">
        Hola x, parece que todavía no ha realizado ningún pedido
        con nosotros. Realice su primer pedido, si necesita ayuda para hacer su
        primera compra, estamos aquí para asistirle.
      </Typography>
    ) : (
      <>
        <Box
          sx={{
            maxHeight: "350px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {cartItems.map((item, i) => (
            <ItemCart key={i} item={item} />
          ))}
        </Box>
        <Grid container>
          <Grid
            item
            xs={9}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              className="total"
              sx={{ marginTop: "10px", marginRight: "30px" }}
            >
              TOTAL: {numeral(total).format("$0,0")}
            </Typography>
          </Grid>
        </Grid>
      </>
    )}
  </Box>
    );
};

export default MisPedidos;
