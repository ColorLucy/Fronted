import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderComponent from './OrderComponent';

export default function Orders() {
  const [stateProduct, setStateProduct] = useState('Pendiente');

  const handleProductState = (state) => {
    setStateProduct(state);
  };

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
      costoEnvioPreguntar: 6800
    },
    {
      id_order: 102,
      date: "03/08/2023",
      total: 123000,
      state: "Pendiente",
      productName: "Lija 3M",
      detail: "3/4 granos 100",
      image: "url",
      price: 100000,
      quantity: "1 ud.",
      subtotal: 100000,
      clientName: "william",
      email: "william@gmail.com",
      direction: "CL 5 #18-34 Valle del Cauca",
      tel: 3202707070,
      formOfPayment: "Efectivo",
      costoEnvioPreguntar: 23000
    },
    {
      id_order: 103,
      date: "15/12/2023",
      total: 110000,
      state: "Cancelado",
      productName: "Aceite de motor",
      detail: "Sintético 5W30",
      image: "url",
      price: 100000,
      quantity: "1 ud.",
      subtotal: 100000,
      clientName: "Ana María",
      email: "ana@gmail.com",
      direction: "Calle 10 #25-15 Bogotá",
      tel: 3101234567,
      formOfPayment: "Tarjeta crédito",
      costoEnvioPreguntar: 10000
    },
    {
      id_order: 104,
      date: "20/06/2023",
      total: 105000,
      state: "Completado",
      productName: "Lámpara LED",
      detail: "15W luz cálida",
      image: "url",
      price: 90000,
      quantity: "1 ud.",
      subtotal: 90000,
      clientName: "Luisa Fernanda",
      email: "luisa@gmail.com",
      direction: "CL 15 #30-45 Medellín",
      tel: 3009876543,
      formOfPayment: "Transferencia bancaria",
      costoEnvioPreguntar: 15000
    },
    {
      id_order: 105,
      date: "10/05/2023",
      total: 13600,
      state: "Completado",
      productName: "Kit de herramientas",
      detail: "Destornilladores varios",
      image: "url",
      price: 60000,
      quantity: "2 ud.",
      subtotal: 12000,
      clientName: "Andrés López",
      email: "andres@example.com",
      direction: "Carrera 7 #12-34 Barranquilla",
      tel: 3158765432,
      formOfPayment: "Efectivo",
      costoEnvioPreguntar: 16000
    }
  ]

  return (
    <div display="flex">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" justify="center" gutterBottom paddingTop={15}>
            Pedidos
          </Typography>
        </Grid>
        {orders.map((order) => (
          <Grid key={order.id_order} item xs={12}>
            <OrderComponent instance={order} handleProductState={handleProductState} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
