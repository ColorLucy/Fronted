import { WhatsApp } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import React from 'react';
import numeral from 'numeral';

function ProductCard({ product }) {
    const formattedPrice = numeral(product?.detalles[0]?.precio).format('$0,0.00');

    return (
        <Card sx={{ width: "260px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="210"
                    src={product?.detalles[0]?.imagenes.length > 0 ? product?.detalles[0]?.imagenes[0].url : "homeColorLucy1.png"}
                    loading='lazy'
                    alt={product?.detalles[0]?.nombre}
                    sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ paddingBlock: "2px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {formattedPrice}
                    </Typography>
                    <Typography sx={{}} color="text.secondary">
                        {product?.fabricante}
                    </Typography>
                    <Typography noWrap sx={{ fontSize: 16, height: "24px" }} >
                        {product?.detalles[0]?.nombre}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" sx={{ paddingInline: "10px", maxHeight: "50px" }} startIcon={<AddShoppingCartIcon />} size='small'>
                    AÑADIR AL CARRITO
                </Button>
                <IconButton aria-label="ORDENAR VÍA WHATSAPP">
                    <WhatsApp sx={{ color: green[500] }} />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ProductCard;