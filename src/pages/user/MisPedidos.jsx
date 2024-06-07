import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import numeral from "numeral";
import {
  Button,
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Typography,
  Paper
} from "@mui/material";
import { ItemTitle } from "../../components/OrderItems"
import "../../pages/user/shoppingcart.css";
import homeColorLucyImg from "../../../public/homeColorLucy1.png";
import axiosInstance from "../../utils/axiosInstance";

const MisPedidos = () => {
  const [historyData, setHistoryData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Cargando Pedidos...");
  const [basicInformation, setBasicInformation] = useState([]);
  const client = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory(client.id)
  }, []);

  /**
   * handles the retrieval of data from client order history
   * sending a GET request to the server
   * @param {id} - id from client
   * @param {Event} e - the event from the form that triggers the function
   */
  async function fetchHistory(id) {
    const response = await axiosInstance.get(`/shopping/client-order-history/?client_id=${id}`);
    const data = response.data
    const basicInformacionOrders = data.map(order => ({
      fecha_pedido: order.fecha_pedido.substring(0,10),
      total: order.total,
      id_pedido: order.id_pedido,
      productos: order.productos
    }));
    setBasicInformation(basicInformacionOrders)
    setHistoryData(data)
  }

  const handleViewOrderDetails = (e, orderId) => {
    const order = historyData.find((order) => order.id_pedido === orderId);
    navigate(`/profile/mis-pedidos/${orderId}`, { state: {order}});
  }

  if (!historyData || loading) {
    return (
      <div style={{ textAlign: "center", height: "calc(100dvh - 180px)" }}>
        <CircularProgress style={{ margin: "100px" }} />
        <Typography>
          {loadingMessage}
        </Typography>
      </div>
    );
  }

  return (   
    <Box sx={{ minHeight: "calc(100dvh - 200px)", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "15px 50px 0 10px",
          width: "95%",
        }}
      >
        <Typography sx={{ cursor: "auto" }}>
          Total Pedidos: {basicInformation.length}
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ margin: "0 10px 15px 10px" }}/>
      {basicInformation.length === 0 ? (
        <Typography className="cartNull" color="GrayText" maxWidth={"550px"}>
          Hola {client.name}, parece que todavía no ha realizado ningún pedido
          con nosotros. Realice su primer pedido, si necesita ayuda para hacer su
          primera compra, estamos aquí para asistirle.
        </Typography>
      ) : (
        <>
          {basicInformation.map((pedido, indexPedido) => (
            <React.Fragment key={indexPedido} >
              <Grid container maxWidth={"900px"} spacing={1} sx={{ mb: 8, border: "1px dotted grey"}}>
                <CardActionArea sx={{ display: "flex", cursor: "default", pointerEvents: "none"}}>
                  <Grid container alignItems={"center"} justifyContent={"center"}>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2 }}>
                        <ItemTitle>Fecha del pedido</ItemTitle>
                        {pedido.fecha_pedido}
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2 }}>
                        <ItemTitle>Total</ItemTitle>
                          { numeral(pedido.total).format("$0,0") }
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2 }}>
                        <ItemTitle>ID Pedido</ItemTitle>
                        # {pedido.id_pedido}
                      </Paper>
                    </Grid>
                    {pedido.productos.map((producto, index) => (
                      <Grid container spacing={0} marginLeft={"32px"} marginTop={"5px"} alignItems={"center"}>
                        <React.Fragment key={index} >
                          <Grid item xs={3}>
                            <CardContent>
                              <CardMedia
                                component="img"
                                height="70px"
                                width="80px !important"
                                src={
                                  producto.detalle.imagenes.length > 0
                                    ? producto.detalle.imagenes[0]
                                    : homeColorLucyImg
                                }
                                loading="lazy"
                                alt={producto.nombre}
                                sx={{ objectFit: "contain" }}
                              />
                            </CardContent>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography fontSize={"15px"}> { producto.detalle.nombre } </Typography>
                            <Typography fontSize={"13px"}> Color: { producto.detalle.color } </Typography>
                            <Typography fontSize={"13px"}> { producto.detalle.unidad } </Typography>
                            <Typography fontSize={"14px"} color={"gray"}> 1 ud. { numeral(producto.detalle.precio).format("$0,0") } </Typography> 
                          </Grid>
                          <Grid item xs={3} sx={{ display: "flex" }}>
                            <Typography color={"gray"} alignSelf={"center"} sx={{ margin: "0px 15px 0 15px" }}>
                            Total uds. { producto.cantidad }
                            </Typography>
                          </Grid>
                          <Grid item xs={3} display={"flex"} justifyContent={"center"}>
                            <Typography>
                              {numeral(producto.cantidad * producto.detalle.precio).format("$0,0")}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      </Grid>
                    ))}
                  </Grid>
                </CardActionArea>
                  <Grid
                    container
                    spacing={0.5}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    margin
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={(e) => handleViewOrderDetails(e, pedido.id_pedido)}
                      >
                        Ver detalles del pedido
                      </Button>
                    </Grid>
                  </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </>
      )}
    </Box>
  );
};

export default MisPedidos;
