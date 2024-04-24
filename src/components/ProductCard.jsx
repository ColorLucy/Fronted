import { WhatsApp } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import React from 'react';
import numeral from 'numeral';
import homeColorLucyImg from "../../public/homeColorLucy1.png"
function obtenerColoresDeProducto(detalles) {
    const colores = new Set();
    detalles.forEach(detalle => {
        if (detalle.color && detalle.color !== "NA") {
            colores.add(detalle.color);
        }
    });
    return Array.from(colores);
}
const convertirColor = (colorEnEspanol) => {
    const mapaDeColores = {
        "ROSADA": "#FFC0CB",
        "ROJO": "#FF0000",
        "AZUL": "#0000FF",
        "ROJA": "#FF0000",
        "VERDE": "#008000",
        "AMARILLO": "#FFFF00",
        "BRONCE": "#CD7F32",
        "NEUTRO": "#F5F5F5",
        "GRIS": "#808080",
        "AMARILLA": "#FFFF00",
        "BLANCA": "#FFFFFF",
        "NEGRO": "#000000",
        "BLANCO": "#FFFFFF"

    };

    return mapaDeColores[colorEnEspanol.toUpperCase()] || null;
}

function ProductCard({ product }) {
    console.log(product)
    const { detalles, fabricante, id_producto, nombre } = product
    const formattedPrice = numeral(detalles[0].precio).format('$0,0.00');
    const coloresDetalles = obtenerColoresDeProducto(detalles);
    const coloresHtml = coloresDetalles.map(convertirColor);
    return (
        <Card sx={{ width: "260px" }}>
            <CardActionArea href={"/productos/" + id_producto}>
                <CardMedia
                    component="img"
                    height="210"
                    weight="260px !important"
                    src={detalles[0].imagenes.length > 0 ? detalles[0].imagenes[0].url : homeColorLucyImg}
                    loading='lazy'
                    alt={nombre}
                    sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ paddingBlock: "2px", width: "260px" }}>
                    <Typography noWrap sx={{ fontSize: 14, height: "24px" }} >
                        {nombre}
                    </Typography>
                    <div style={{ display: "flex" }}>
                        <AvatarGroup max={4}>
                            {coloresHtml ? coloresHtml.map((colorHtml, index) => {
                                return (
                                    <Avatar key={index} sx={{ bgcolor: colorHtml, width: 16, height: 16 }}>
                                        <></></Avatar>
                                )
                            }) : <></>}
                        </AvatarGroup>
                        <Typography sx={{ fontSize: 12, height: "24px" }} color="text.secondary">
                            {fabricante === "NA" ? "" : fabricante}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {formattedPrice}
                        </Typography>
                        <Typography sx={{ fontSize: 12, height: "24px", alignItems: "center" }} color="text.secondary">
                            ({detalles[0]?.unidad})
                        </Typography>
                    </div>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" sx={{ paddingInline: "10px", width: "260px" }} startIcon={<AddShoppingCartIcon />} fullWidth>
                    AÑADIR AL CARRITO
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;