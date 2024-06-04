import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { CardMedia, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item, Item2, ItemTitle, ItemTitle2, ItemDynamic } from './OrderItems';
import homeColorLucyImg from "../../public/homeColorLucy1.png";
import numeral from "numeral";


const OrderComponent = ({instance, client}) => {
    const [stateProduct, setStateProduct] = useState("");

    const date_format = new Date(Date.parse(instance.fecha_pedido)).toLocaleString("es-co", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })

    const instance_obj = {
        id_order: instance.id_pedido,
        date: date_format,
        total: instance.total,
        state: instance.estado,
        products: instance.productos,
        clientName: client.name,
        email: client.email,
        direction: instance.address,
        tel: instance.phone_number,
        typeDelivery: instance.tipo_envio,

        subtotal: "NA",
        costoEnvioPreguntar: 0
    }

    useEffect(() => {
        setStateProduct("-");
        console.log(instance, "instance")
    },[]);    

    return (
        <div display={"flex"} >
            <Grid container spacing={0} >
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        width={900}
                        my={4}
                        mx="auto"
                        alignItems="stretch"
                        justifyContent="center"
                        textAlign="center"
                        gap={4}
                        sx={{ border: '2px dotted grey' }}
                        padding={3}
                        marginBottom={"100px"}
                    >
                        <Grid container spacing={0} >
                            <Grid item xs={4.5}>
                                <Paper sx={{ p: 2, }}>
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
                                    <ItemTitle >ID Pedido</ItemTitle>
                                    # {instance_obj.id_order}
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
                                    <Grid container spacing={0} marginLeft={"0px"} marginTop={"0px"} alignItems={"center"}>
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
                                            <Grid container spacing={0} >
                                                <Grid item xs={4.5}>
                                                    <ItemTitle2 fontSize={"15px"}> {product.detalle.nombre} </ItemTitle2>
                                                    <Item2> Color: {product.detalle.color}</Item2>
                                                    <Item2>{product.detalle.unidad}</Item2>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <ItemTitle2> Precio Unidad</ItemTitle2>
                                                    <Item2>{numeral(product.detalle.precio).format("$0,0")} </Item2>
                                                </Grid>
                                                <Grid item xs={2}>
                                                <ItemTitle2> Cantidad </ItemTitle2>
                                                    <Item2> {product.cantidad} </Item2>
                                                </Grid>
                                                <Grid item xs={2.5}>
                                                <ItemTitle2> Subtotal </ItemTitle2>
                                                    <Item2> {numeral(product.cantidad * product.detalle.precio).format("$0,0")} </Item2>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            

                            <Grid container spacing={1} direction="column" justifyContent="flex-start" alignItems="flex-start" marginLeft={"22px"}>
                                <Grid item xs={4} >
                                    <Item2> Datos del cliente </Item2>    
                                    <Item> Nombre: {instance_obj.clientName} - {instance_obj.email} </Item>
                                    <Item> Direccion: {instance_obj.direction} </Item>
                                    <Item> Tel: {instance_obj.tel} </Item>
                                </Grid>
                                <Grid marginTop={"4px"}item xs={3}>
                                    <Item2> Tipo de entrega </Item2>
                                    <Item> {instance_obj.typeDelivery} </Item> 
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} direction="row" justifyContent="center" alignItems="flex-end" marginLeft={"22px"} marginTop={"5px"}> 
                                <Grid item xs={12}> <Item2> Resumen </Item2> </Grid>
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" marginLeft={"8px"}>
                                    <Grid item xs={10}> <Item> Subtotal </Item> </Grid>
                                    <Grid item xs={2}> <Item textAlign="right"> {numeral(instance_obj.total + instance_obj.costoEnvioPreguntar).format("$0,0")} </Item> </Grid>
                                </Grid>
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" marginLeft={"8px"}>
                                    <Grid item xs={10}> <Item> Costo del envio </Item> </Grid>
                                    <Grid item xs={2}> <Item>$ {instance_obj.costoEnvioPreguntar} </Item> </Grid>
                                </Grid>
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" marginLeft={"8px"}>
                                    <Grid item xs={10}> <Item> Total </Item> </Grid>
                                    <Grid item xs={2}> <Item> {numeral(instance_obj.total).format("$0,0")} </Item>  </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
      );
}

export default OrderComponent;