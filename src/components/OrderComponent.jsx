import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import numeral from "numeral";
import { Item, Item2, ItemDynamic, ItemTitle, ItemTitle2 } from "./OrderItems";
import { patchOrder, getUserInfo } from "../utils/orders";
import homeColorLucyImg from "/homeColorLucy1.png";

const OrderComponent = ({ instance }) => {
  const [stateProduct, setStateProduct] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  /**
   *
   * @param {String} str
   * @returns
   */
  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  };

  const date_format = new Date(
    Date.parse(instance.fecha_pedido)
  ).toLocaleString("es-co", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const instance_obj = {
    id_order: instance.id_pedido,
    id_user: instance.user,
    date: date_format,
    total: instance.total,
    state: toTitleCase(instance.estado),
    products: instance.productos,
    clientName: userName,
    email: userEmail,
    direction: instance.address,
    tel: instance.phone_number,
    typeDelivery: instance.tipo_envio,
    subtotal: "NA",
    costoEnvioPreguntar: 0,
  };

  const handleCompleteOrder = async (state) => {
    setStateProduct(state);
    const request = {
      estado: "completado",
    };
    await patchOrder(instance.id_pedido, request)
      .then(() => {
        console.log("El pedido ha sido completado exitosamente");
        window.alert(`El pedido ha sido completado exitosamente`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Ocurrió un error al completar el pedido: ", error);
        window.alert(
          "Ocurrió un error al completar el pedido, vuelva a intentarlo"
        );
      });
  };

  const handleCancelOrder = async (state) => {
    setStateProduct(state);
    const request = {
      estado: "cancelado",
    };
    await patchOrder(instance.id_pedido, request)
      .then(() => {
        console.log("El pedido ha sido cancelado exitosamente");
        window.alert(`El pedido ha sido cancelado exitosamente`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Ocurrió un error al completar el pedido: ", error);
        window.alert(
          "Ocurrió un error al completar el pedido, vuelva a intentarlo"
        );
      });
  };

  useEffect(() => {
    setStateProduct(instance_obj.state);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo(instance_obj.id_user);
      if (data) {
        setUserName(data.name);
        setUserEmail(data.email);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Box display={"flex"}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            display="flex"
            width={900}
            my={0}
            mx="auto"
            alignItems="stretch"
            justifyContent="center"
            textAlign="center"
            gap={4}
            sx={{ border: "2px solid grey" }}
            padding={0}
            marginBottom={"100px"}
          >
            <Grid container spacing={0}>
              <Grid item xs={4.5}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Fecha del pedido</ItemTitle>
                  {instance_obj.date}
                </Paper>
              </Grid>
              <Grid item xs={2.5}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Total</ItemTitle>
                  {numeral(instance_obj.total).format("$0,0")}
                </Paper>
              </Grid>
              <Grid item xs={2.5}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>ID Pedido</ItemTitle># {instance_obj.id_order}
                </Paper>
              </Grid>
              <Grid item xs={2.5}>
                <Paper sx={{ p: 2 }}>
                  <ItemTitle>Estado</ItemTitle>
                  <ItemDynamic state={stateProduct}>{stateProduct}</ItemDynamic>
                </Paper>
              </Grid>

              {instance_obj.products.map((product, index) => (
                <React.Fragment key={index}>
                  <Grid
                    container
                    spacing={0}
                    marginLeft={"0px"}
                    marginTop={"0px"}
                    alignItems={"center"}
                    padding={"0 16px"}
                  >
                    <Grid item xs={3}>
                      <CardContent>
                        <CardMedia
                          component="img"
                          height="50%"
                          width="80px !important"
                          src={
                            product.detalle.imagenes.length > 0
                              ? product.detalle.imagenes[0]
                              : homeColorLucyImg
                          }
                          loading="lazy"
                          alt={product.nombre}
                          sx={{ objectFit: "contain" }}
                        />
                      </CardContent>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={0}>
                        <Grid item xs={4.5}>
                          <ItemTitle2 fontSize={"15px"}>
                            {" "}
                            {product.detalle.nombre}{" "}
                          </ItemTitle2>
                          <Item2> Color: {product.detalle.color}</Item2>
                          <Item2>{product.detalle.unidad}</Item2>
                        </Grid>

                        <Grid item xs={3}>
                          <ItemTitle2> Precio Unidad</ItemTitle2>
                          <Item2>
                            {numeral(product.detalle.precio).format("$0,0")}{" "}
                          </Item2>
                        </Grid>
                        <Grid item xs={2}>
                          <ItemTitle2> Cantidad </ItemTitle2>
                          <Item2> {product.cantidad} </Item2>
                        </Grid>
                        <Grid item xs={2.5}>
                          <ItemTitle2> Subtotal </ItemTitle2>
                          <Item2>
                            {" "}
                            {numeral(
                              product.cantidad * product.detalle.precio
                            ).format("$0,0")}{" "}
                          </Item2>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}

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
                    Nombre: {instance_obj.clientName} - {instance_obj.email}{" "}
                  </Item>
                  <Item> Direccion: {instance_obj.direction} </Item>
                  <Item> Tel: {instance_obj.tel} </Item>
                </Grid>
                <Grid marginTop={"4px"} item xs={3}>
                  <Item2> Tipo de entrega </Item2>
                  <Item> {instance_obj.typeDelivery} </Item>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                marginLeft={"22px"}
                marginTop={"5px"}
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
                      {" "}
                      {numeral(
                        instance_obj.total + instance_obj.costoEnvioPreguntar
                      ).format("$0,0")}{" "}
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
                    <Item>
                      {" "}
                      {numeral(instance_obj.total).format("$0,0")}{" "}
                    </Item>{" "}
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={0.5}
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-end"
                  marginTop={"16px"}
                  marginRight={"16px"}
                >
                  <Grid item marginBottom={"8px"}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleCompleteOrder("Completado")}
                    >
                      Completar Pedido
                    </Button>
                  </Grid>
                  <Grid item marginBottom={"16px"} marginRight={"5px"}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCancelOrder("Cancelado")}
                    >
                      Cancelar Pedido
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderComponent;
