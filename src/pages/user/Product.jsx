import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Grid, Paper, Radio } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import RadioGroup from '@mui/material/RadioGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import numeral from 'numeral';
import { default as React, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { convertirColor } from '../../utils/colors';

const Bread_crumb = ({ categoria, nombreProducto, fabricanteProducto }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" key="1" color="inherit" href="/productos" >
        PRODUCTOS
      </Link>
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/productos/?categoria=${categoria.id_categoria}`}
      >
        {categoria.nombre}
      </Link>,
      <Typography key="3" color="text.primary">
        {nombreProducto} ({fabricanteProducto})
      </Typography>,
    </Breadcrumbs>
  )
}
const colorsAvailable = (details, unity) => {
  const colorsUnity = details
    .filter((detail) => detail.unidad === unity)
    .map(detail => detail.color)
    .filter((value, index, array) => value !== "NA" && (array.indexOf(value) === index))
  return colorsUnity
}
const Product = () => {
  let { id_producto } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const unityURL = decodeURIComponent(queryParams.get("unidad"));
  const colorURL = decodeURIComponent(queryParams.get("color"));
  const [product, setProduct] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [unity, setUnity] = useState(null)
  const [color, setColor] = useState(null)
  const [details, setDetails] = useState([])
  const [detailsUnity, setDetailsUnity] = useState([]);
  const [detailsColors, setDetailsColors] = useState([]);
  const [detailsColorsHTML, setDetailsColorsHTML] = useState([]);
  const [detailsUnityColors, setDetailsUnityColors] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/products/product-details/${id_producto}/`);
        setProduct(data);
        console.log(data)
        setDetails(data.detalles);
        const detailsUnitys = data.detalles
          .map(detalle => detalle.unidad)
          .filter((value, index, array) => array.indexOf(value) === index)
        setDetailsUnity(detailsUnitys)
        setUnity(detailsUnitys.includes(unityURL) ? unityURL : data.detalles[0].unidad)
        const colorsText = data.detalles
          .map(detalle => detalle.color)
          .filter((value, index, array) => value !== "NA" && (array.indexOf(value) === index))
        setDetailsColors(colorsText)
        setDetailsColorsHTML(colorsText.map(colorText => convertirColor(colorText)))
        setDetailsUnityColors(colorsAvailable(data.detalles, detailsUnitys.includes(unityURL) ? unityURL : data.detalles[0].unidad))
        setColor(colorsText.includes(colorURL) ? colorURL : data.detalles[0].color)
        setSelectedDetail(detailsUnitys.includes(unityURL) ?
          colorsText.includes(colorURL) ? data.detalles.find(detail => detail.unidad === unityURL && detail.color === colorURL)
            : data.detalles.find(detail => detail.unidad === unityURL)
          : data.detalles[0]);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    if (!product || product.id_producto !== id_producto) { fetchProducto() }
  }, [id_producto]);

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  const handleDetailSelect = (detail) => {
    setSelectedDetail(detail);
  };
  const handleUnityChange = (event, newUnity) => {
    setUnity(newUnity);
    const colors = colorsAvailable(product.detalles, newUnity)
    setDetailsUnityColors(colors)
    if (colors.length && !colors.includes(color)) {
      setColor(colors[0])
      setSelectedDetail(details.find(detail => detail.unidad === newUnity && detail.color === colors[0]))
      navigate(`?unidad=${encodeURIComponent(newUnity)}&color=${encodeURIComponent(colors[0])}`)
    } else if (colors.includes(color)) {
      setSelectedDetail(details.find(detail => detail.unidad === newUnity && detail.color === color))
      navigate(`?unidad=${encodeURIComponent(newUnity)}&color=${encodeURIComponent(color)}`)
    } else {
      navigate(`?unidad=${encodeURIComponent(newUnity)}}`)
    }
  }
  const handleColorChange = (e) => {
    setColor(e.target.value)
    setSelectedDetail(details.find(detail => detail.unidad === unity && detail.color === e.target.value))
    navigate(`?unidad=${encodeURIComponent(unity)}&color=${encodeURIComponent(e.target.value)}`)
  }
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: 2 }}>
      <Bread_crumb categoria={product.categoria} nombreProducto={product.nombre} fabricanteProducto={product.fabricante} />
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
              <Paper key={index} elevation={0} sx={{ position: 'relative', height: 550 }}>
                <img src={imgDetalle.url} alt={selectedDetail.nombre}
                  style={{
                    width: "100%", maxHeight: "100%", objectFit: 'contain',
                    borderRadius: "12px", opacity: activeStep === index ? 1 : 0.5,
                  }} />
              </Paper>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h4">{selectedDetail.nombre}</Typography>
          <Typography variant="h6" color="text.secondary">{product.fabricante}</Typography>
          <Typography variant="body1">{selectedDetail.descripcion}</Typography>
          <Typography variant="h5" sx={{ my: 2 }}>{numeral(selectedDetail.precio).format('$0,0.00')}</Typography>
          <Grid container spacing={2}>
            <Box display="flex" flexDirection="column" margin={"10px"}>
              <Typography variant="h7" color="text.secondary">Presentación: {selectedDetail.unidad}</Typography>
              <ToggleButtonGroup
                value={unity}
                size="small"
                exclusive
                onChange={handleUnityChange}
                aria-label="Unidad"
              >
                {detailsUnity.map((detailUnity, index) => {
                  return (
                    <ToggleButton key={index} value={detailUnity} aria-label={"Presentacion " + detailUnity}>
                      {detailUnity}
                    </ToggleButton>)
                })}
              </ToggleButtonGroup>
            </Box>
            {detailsColors.length !== 0 && <Box margin={"10px"}>

              <FormControl>
                <FormLabel disabled>Color: {selectedDetail.color}</FormLabel>
                <RadioGroup
                  row
                  name="radio-buttons-group"
                  value={color}
                >
                  {
                    detailsColors.map((detailsColor, index) => {
                      return (<FormControlLabel key={index} value={detailsColor}
                        control={<Radio
                          checked={detailsColor === color}
                          onChange={handleColorChange}
                          disabled={!detailsUnityColors.includes(detailsColor)}
                          sx={{
                            color: detailsColorsHTML[index],
                            '&.Mui-checked': {
                              color: detailsColorsHTML[index],
                            },
                          }}
                        />} label={detailsColor} />)
                    })
                  }
                </RadioGroup>
              </FormControl>
            </Box>}
          </Grid>

          <Button variant="contained" sx={{ paddingInline: "10px", width: "260px" }} startIcon={<AddShoppingCartIcon />} fullWidth>
            AÑADIR AL CARRITO
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
