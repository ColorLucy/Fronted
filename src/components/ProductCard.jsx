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
    const formattedPrice = numeral(product.precio).format('$0,0.00');

    return (
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    src={product?.imagenes[0]}
                    alt={product.nombre}
                    sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ paddingBlock: "2px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {formattedPrice}
                    </Typography>
                    <Typography sx={{}} color="text.secondary">
                        {product.producto.fabricante}
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} >
                        {product.nombre}
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