import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./shoppingcart.css";
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
import { WhatsApp } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function Cart() {
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

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleWhatsAppOrder = () => {
    if (userName === "") {
      alert("Por favor ingrese su nombre antes de continuar");
      return;
    } else {
      const cartInfo = cartItems.map(
        (item) =>
          `${item.nombre} - ${item.unidad}- ${item.amount} unidades - ${numeral(
            parseFloat(item.precio)
          ).format("$0,0")} la unidad,`
      );
      const message = `Hola, soy ${userName}, me gustaría ordenar lo siguiente:\n${cartInfo.join(
        "\n"
      )}\nTotal: ${numeral(total).format("$0,0")}`;
      const whatsappLink = `https://wa.me/573155176725/?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappLink, "_blank");
      handleDialogClose();
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100dvh - 200px)',margin: '20px',
      '&::-webkit-scrollbar': {
        width: '20px',
      }}}>
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
          Tu carrito está vacío
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              maxHeight: "350px",
              overflowY: "auto",
              // overflowX: "hidden",
              // '&::-webkit-scrollbar': {
              //   width: '10px',
              // }
            }}
          >
            {cartItems.map((item, i) => (
              <ItemCart key={i} item={item} />
            ))}
          </Box>
          <Grid sx={{ display: "flex", justifyContent: "end" , marginRight: '20px', marginTop: '10px' }} >
            <Typography
              sx={{fontWeight: "bold"}}
            >
              TOTAL: {numeral(total).format("$0,0")}
            </Typography>
          </Grid>
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  marginTop: '10px',
                  marginRight: '10px',
                  height: { xs: '40px', sm: '45px', md: '50px' },
                  width: { xs: '100%', sm: 'auto', md: '232px' },
                  backgroundColor: '#2e7d32',
                  color: 'white',
                }}
                onClick={() => {
                  handleDialogOpen();
                  setCartOpen(false);
                }}
              >
                <WhatsApp sx={{ color: 'white', marginRight: '2px' }} />
                <Typography color="white" sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' }}} >
                  Enviar a un asesor
                </Typography>
              </Button>
              <Link
                to="/pedido"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: '10px',
                    height: { xs: '40px', sm: '45px', md: '50px' },
                    width: { xs: '100%', sm: 'auto', md: '232px' },
                  }}
                >
                  <Typography color="white" sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' }}}>
                    Finalizar compra
                  </Typography>
                </Button>
              </Link>
            </Grid>
        </>
      )}

      {openDialog && (
        <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={openDialog}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por favor ingrese su nombre
            </DialogContentText>
            <TextField
              label="Nombre"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              sx={{ marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Box onClick={handleDialogClose} sx={{ cursor: "pointer" }}>
              Cerrar
            </Box>
            <Box
              onClick={() => {
                handleWhatsAppOrder();
              }}
              sx={{ cursor: "pointer" }}
            >
              Aceptar
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default Cart;
