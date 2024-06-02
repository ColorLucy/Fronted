import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item, Item2, ItemTitle, ItemTitle2, ItemDynamic } from "./OrderItems";

const OrderComponent = ({ instance, handleProductState }) => {
  const [stateProduct, setStateProduct] = useState("");

  /**
   *
   * @param {String} str
   * @returns
   */
  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  };

  const instance_obj = {
    id_order: instance.id_pedido,
    date: new Date(Date.parse(instance.fecha_pedido)).toLocaleString("es-co", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
    total: instance.total,
    state: toTitleCase(instance.estado),
    productName: "Lija",
    detail: "La mejor Lija",
    image: "Imagen",
    price: "35000",
    quantity: instance.cantidad_productos,
    subtotal: instance.subtotal,

    clientName: instance.user,
    direction: instance.address,
    tel: instance.phone_number,
    shippingType: instance.tipo_envio,
    costoEnvioPreguntar: "0",
  };

  useEffect(() => {
    setStateProduct(instance_obj.state);
  }, []);

  return (
    <div display={"flex"}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            display="flex"
            height={700}
            width={900}
            my={0}
            mx="auto"
            alignItems="stretch"
            justifyContent="center"
            textAlign="center"
            gap={4}
            sx={{ border: "2px solid grey" }}
          >
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Fecha del pedido</ItemTitle>
                  {instance_obj.date}
                </Paper>
              </Grid>
              <Grid item xs={8 / 3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Total</ItemTitle>
                  {instance_obj.total}
                </Paper>
              </Grid>
              <Grid item xs={8 / 3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>ID Pedido</ItemTitle># {instance_obj.id_order}
                </Paper>
              </Grid>
              <Grid item xs={8 / 3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Estado</ItemTitle>
                  <ItemDynamic state={stateProduct}>{stateProduct}</ItemDynamic>
                </Paper>
              </Grid>
              <Grid container spacing={0} p={2}>
                <Grid item xs={4}>
                  <ItemTitle2>Producto</ItemTitle2>
                  <div>foto</div>
                  {instance_obj.image}
                  <div>foto</div>
                  <ItemTitle2>{instance_obj.productName}</ItemTitle2>
                  <ItemTitle2>{instance_obj.detail}</ItemTitle2>
                </Grid>
                <Grid item xs={8} p={2}>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <ItemTitle2> Precio </ItemTitle2>
                      <Item2>$ {instance_obj.price} </Item2>
                    </Grid>
                    <Grid item xs={4}>
                      <ItemTitle2> Cantidad </ItemTitle2>
                      <Item2> {instance_obj.quantity} </Item2>
                    </Grid>
                    <Grid item xs={4}>
                      <ItemTitle2> Subtotal </ItemTitle2>
                      <Item2>$ {instance_obj.subtotal} </Item2>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                marginLeft={"22px"}
              >
                <Grid item xs={4}>
                  <Item2> Datos del cliente </Item2>
                  <Item>
                    {" "}
                    Nombre: {instance_obj.clienteName} - {instance_obj.email}{" "}
                  </Item>
                  <Item> Direccion: {instance_obj.direction} </Item>
                  <Item> Tel: {instance_obj.tel} </Item>
                </Grid>
                <Grid marginTop={"4px"} item xs={3}>
                  <Item2> Forma de pago </Item2>
                  <Item> {instance_obj.shippingType} </Item>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                marginLeft={"22px"}
              >
                <Grid item xs={12}>
                  {" "}
                  <Item2> Resumen </Item2>{" "}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  marginLeft={"8px"}
                >
                  <Grid item xs={10}>
                    {" "}
                    <Item> Subtotal </Item>{" "}
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    <Item textAlign="right">
                      $ {instance_obj.subtotal}{" "}
                    </Item>{" "}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  marginLeft={"8px"}
                >
                  <Grid item xs={10}>
                    {" "}
                    <Item> Costo del envio </Item>{" "}
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    <Item>$ {instance_obj.costoEnvioPreguntar} </Item>{" "}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  marginLeft={"8px"}
                >
                  <Grid item xs={10}>
                    {" "}
                    <Item> Total </Item>{" "}
                  </Grid>
                  <Grid item xs={2}>
                    {" "}
                    <Item>$ {instance_obj.total} </Item>{" "}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0.5}
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                marginRight={"32px"}
                marginBottom={"1px"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleProductState("Completado")}
                  >
                    Pedido completado
                  </Button>
                </Grid>
                <Grid item marginRight={"4px"}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleProductState("Cancelado")}
                  >
                    Pedido cancelado
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderComponent;
