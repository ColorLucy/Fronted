import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Item,
  Item2,
  ItemTittle,
  ItemTittle2,
  ItemDynamic,
} from "./OrderItems";

const OrderComponent = ({ instance, handleProductState }) => {
  const [stateProduct, setStateProduct] = useState("");

  const instance_obj = {
    id_order: instance.id_order,
    date: instance.date,
    total: instance.total,
    state: instance.state,

    productName: instance.productName,
    detail: instance.detail,
    image: instance.image,
    price: instance.price,
    quantity: instance.quantity,
    subtotal: instance.subtotal,

    clientName: instance.clientName,
    email: instance.email,
    direction: instance.direction,
    tel: instance.tel,
    formOfPayment: instance.formOfPayment,

    costoEnvioPreguntar: instance.costoEnvioPreguntar,
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
            height={600}
            width={900}
            my={4}
            mx="auto"
            alignItems="stretch"
            justifyContent="center"
            textAlign="center"
            gap={4}
            sx={{ border: "2px solid grey" }}
          >
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTittle>Fecha del pedido</ItemTittle>
                  {instance_obj.date}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTittle>Total</ItemTittle>
                  {instance_obj.total}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTittle>ID Pedido</ItemTittle># {instance_obj.id_order}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <ItemTittle>Estado</ItemTittle>
                  <ItemDynamic state={stateProduct}>{stateProduct}</ItemDynamic>
                </Paper>
              </Grid>
              <Grid container spacing={0} marginLeft={"32px"}>
                <Grid item xs={4}>
                  <ItemTittle2>Producto</ItemTittle2>
                  <div>foto</div>
                  {instance_obj.image}
                  <div>foto</div>
                  <ItemTittle2>{instance_obj.productName}</ItemTittle2>
                  <ItemTittle2>{instance_obj.detail}</ItemTittle2>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <ItemTittle2> Precio </ItemTittle2>
                      <Item2>$ {instance_obj.price} </Item2>
                    </Grid>
                    <Grid item xs={4}>
                      <ItemTittle2> Cantidad </ItemTittle2>
                      <Item2> {instance_obj.quantity} </Item2>
                    </Grid>
                    <Grid item xs={4}>
                      <ItemTittle2> Subtotal </ItemTittle2>
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
                  <Item> {instance_obj.formOfPayment} </Item>
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
