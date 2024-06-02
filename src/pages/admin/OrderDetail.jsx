import { Box, Grid, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderComponent from "../../components/OrderComponent";
import { getOrder } from "../../utils/orders";
import { theme } from "../../styles/theme";

export default function Orders({ modifyTitle }) {
  const { id_order } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [stateProduct, setStateProduct] = useState("Pendiente");

  const orders = [
    {
      id_order: 101,
      date: "23/01/2024",
      total: 93800,
      state: "Cancelado",
      productName: "Catalizador poliescol",
      detail: "Limpiador de cadena",
      image: "url",
      price: 86000,
      quantity: "1 ud.",
      subtotal: 93800,
      clientName: "Maria Suarez",
      email: "mariasz12@gmail.com",
      direction: "CL 5 #100-34 Antioquia",
      tel: 3902707070,
      formOfPayment: "Efectivo",
      costoEnvioPreguntar: 6800,
    },
  ];

  const handleProductState = (state) => {
    setStateProduct(state);
  };

  const fetchOrder = async () => {
    const datos = await getOrder(id_order);
    setOrder([datos]);
  };

  useEffect(() => modifyTitle("Detalles Pedido"), []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <>
          <div>Loading</div>
          {fetchOrder()}
          {setLoading(false)}
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={0}>
            {order.map((order, index) => (
              <Grid key={index} item xs={12}>
                <OrderComponent
                  instance={order}
                  handleProductState={handleProductState}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
