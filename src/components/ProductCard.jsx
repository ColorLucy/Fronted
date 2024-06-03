import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import numeral from "numeral";
import React, { useContext } from "react";
import homeColorLucyImg from "../../public/homeColorLucy1.png";
import { CartContext } from "../context/CartContext";
import { convertirColor } from "../utils/colors";
function obtenerColoresDeProducto(detalles) {
  const colores = new Set();
  detalles.forEach((detalle) => {
    if (detalle.color && detalle.color !== "NA") {
      colores.add(detalle.color);
    }
  });
  return Array.from(colores);
}

function ProductCard({ product }) {
  const { detalles, fabricante, id_producto, nombre } = product;
  const formattedPrice = numeral(detalles[0].precio).format("$0,0.00");
  const coloresDetalles = obtenerColoresDeProducto(detalles);
  const coloresHtml = coloresDetalles.map(convertirColor);

  const { addItemToCart } = useContext(CartContext);

  return (
    <Card sx={{ width: "260px" }}>
      <CardActionArea
        href={`/productos/${encodeURIComponent(nombre)}-${id_producto}`}
      >
        <CardMedia
          component="img"
          height="210"
          weight="260px !important"
          src={
            detalles[0].imagenes.length > 0
              ? detalles[0].imagenes[0].url
              : homeColorLucyImg
          }
          loading="lazy"
          alt={nombre}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ paddingBlock: "2px", width: "260px" }}>
          <Typography noWrap sx={{ fontSize: 14, height: "24px" }}>
            {nombre}
          </Typography>
          <div style={{ display: "flex" }}>
            <AvatarGroup max={4}>
              {coloresHtml ? (
                coloresHtml.map((colorHtml, index) => {
                  return (
                    <Avatar
                      key={index}
                      sx={{ bgcolor: colorHtml, width: 16, height: 16 }}
                    >
                      <></>
                    </Avatar>
                  );
                })
              ) : (
                <></>
              )}
            </AvatarGroup>
            <Typography
              sx={{ fontSize: 12, height: "24px" }}
              color="text.secondary"
            >
              {fabricante === "NA" ? "" : fabricante}
            </Typography>
          </div>

          <div style={{ display: "flex" }}>
            <Typography gutterBottom variant="h5" component="div">
              {formattedPrice}
            </Typography>
            <Typography
              sx={{ fontSize: 12, height: "24px", alignItems: "center" }}
              color="text.secondary"
            >
              ({detalles[0]?.unidad})
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          sx={{ paddingInline: "10px", width: "260px" }}
          startIcon={<AddShoppingCartIcon />}
          fullWidth
          onClick={() => {
            addItemToCart(product.detalles[0]);
          }}
        >
          AÑADIR AL CARRITO
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
