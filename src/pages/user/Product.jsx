import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Grid, Paper } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';

const Bread_crumb = ({ categoria, nombreProducto }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" key="1" color="inherit" href="/productos" >
        PRODUCTOS
      </Link>,
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/productos/?categoria=${categoria.id_categoria}`}
      >
        {categoria.nombre}
      </Link>,
      <Typography key="3" color="text.primary">
        {nombreProducto}
      </Typography>,
    </Breadcrumbs>
  )
}
const Product = () => {
  let { id_producto } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/products/product-details/${id_producto}/`);
        setProduct(data);
        setSelectedDetail(data.detalles[0]);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProducto();
  }, [id_producto]);

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  const handleDetailSelect = (detail) => {
    setSelectedDetail(detail);
  };

  const handleStepChange = (step) => {
    console.log(step)
    setActiveStep(step);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 2 }}>
      <Bread_crumb categoria={product.categoria} nombreProducto={selectedDetail.nombre} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Carousel
            autoPlay={false}
            cycleNavigation
            animation="slide"
            navButtonsAlwaysVisible
            indicators
            duration={500}
            IndicatorIcon={selectedDetail.imagenes.map((item, index) =>
              <img
                key={item.id_detalle}
                src={item.url}
                alt={item.nombre}
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '10px',
                  opacity: activeStep === index ? 1 : 0.5,
                  borderRadius: "10px",
                  border: activeStep === index ? '2px solid #1976d2' : '',
                  cursor: 'pointer'
                }}
              />)}
            activeStep={activeStep}
            onChange={handleStepChange}
          >
            {selectedDetail.imagenes.map((imgDetalle, index) => (
              <Paper key={index} elevation={0} sx={{ position: 'relative', height: 600 }}>
                <img src={imgDetalle.url} alt={selectedDetail.nombre} style={{ width: "100%", maxHeight: "100%", objectFit: 'contain',  borderRadius: "12px", opacity: activeStep === index ? 1 : 0.5, }} />
              </Paper>
            ))}
          </Carousel>

        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h4">{selectedDetail.nombre}</Typography>
          <Typography variant="h6" color="text.secondary">{product.fabricante}</Typography>
          <Typography variant="body1">{selectedDetail.descripcion}</Typography>
          <Typography variant="h5" sx={{ my: 2 }}>${selectedDetail.precio}</Typography>
          <Button variant="contained" color="primary">Add to Cart</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;