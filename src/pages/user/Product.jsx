import { WhatsApp } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Radio,
  useMediaQuery,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import RadioGroup from "@mui/material/RadioGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import numeral from "numeral";
import { default as React, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { convertirColor } from "../../utils/colors";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

/**
 * `Bread_crumb` is a React component that renders a breadcrumb trail. It facilitates navigation by providing links to the product page and the current category. Additionally, it displays the current product name along with the manufacturer's name.
 *
 * @param {object} props - The props passed to the component.
 * @param {object} props.categoria - An object containing information about the product's category.
 * @param {string} props.nombreProducto - The name of the current product.
 * @param {string} props.fabricanteProducto - The manufacturer of the current product.
 * @returns {JSX.Element} A JSX element containing the breadcrumb navigation links.
 */
const Bread_crumb = ({ categoria, nombreProducto, fabricanteProducto }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" key="1" color="inherit" href="/productos">
        PRODUCTOS
      </Link>
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/productos/?categoriaId=${
          categoria.id_categoria
        }&categoriaName=${encodeURIComponent(categoria.nombre)}`}
      >
        {categoria.nombre}
      </Link>
      ,
      <Typography key="3" color="text.primary">
        {nombreProducto} ({fabricanteProducto})
      </Typography>
    </Breadcrumbs>
  );
};
/**
 * `colorsAvailable` is a function that filters and returns unique colors available for a specific unit. It excludes colors marked as not available ("NA") and duplicates.
 *
 * @param {Array} details - The list of product details, each containing a color and unit attribute.
 * @param {string} unity - The selected unit to filter corresponding colors for.
 * @returns {Array} A list of unique available colors for the provided unit.
 */
const colorsAvailable = (details, unity) => {
  const colorsUnity = details
    .filter((detail) => detail.unidad === unity)
    .map((detail) => detail.color)
    .filter(
      (value, index, array) => value !== "NA" && array.indexOf(value) === index
    );
  return colorsUnity;
};

const urlDetail = (detail) => {
  if (detail.color === "NA") {
    return `?unidad=${encodeURIComponent(detail.unidad)}}`;
  } else {
    return `?unidad=${encodeURIComponent(
      detail.unidad
    )}&color=${encodeURIComponent(detail.color)}`;
  }
};

/**
 * `Product` is a React component that renders the product details page. It displays an image carousel, unit and color options for the product, and allows adding products to the cart. The states and effects handle the selection logic and retrieval of product detail data.
 *
 * It uses React Router for handling navigation and URL parameters.
 *
 * @returns {JSX.Element} A JSX element containing the UI for product details.
 */
const Product = () => {
  const { addItemToCart } = useContext(CartContext);
  const { info_producto } = useParams();
  const id_producto = info_producto.split("-")[1];
  const nombre_producto = decodeURIComponent(info_producto.split("-")[0]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const unityURL = decodeURIComponent(queryParams.get("unidad"));
  const colorURL = decodeURIComponent(queryParams.get("color"));
  const [product, setProduct] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [unity, setUnity] = useState(null);
  const [color, setColor] = useState(null);
  const [details, setDetails] = useState([]);
  const [detailsUnity, setDetailsUnity] = useState([]);
  const [detailsColors, setDetailsColors] = useState([]);
  const [detailsColorsHTML, setDetailsColorsHTML] = useState([]);
  const [detailsUnityColors, setDetailsUnityColors] = useState([]);
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/products/product-details/${id_producto}/`
        );
        setProduct(data);
        setDetails(data.detalles);
        const detailsUnitys = data.detalles
          .map((detalle) => detalle.unidad)
          .filter((value, index, array) => array.indexOf(value) === index);
        setDetailsUnity(detailsUnitys);
        setUnity(
          detailsUnitys.includes(unityURL) ? unityURL : data.detalles[0].unidad
        );
        const colorsText = data.detalles
          .map((detalle) => detalle.color)
          .filter(
            (value, index, array) =>
              value !== "NA" && array.indexOf(value) === index
          );
        setDetailsColors(colorsText);
        setDetailsColorsHTML(
          colorsText.map((colorText) => convertirColor(colorText))
        );
        setDetailsUnityColors(
          colorsAvailable(
            data.detalles,
            detailsUnitys.includes(unityURL)
              ? unityURL
              : data.detalles[0].unidad
          )
        );
        setColor(
          colorsText.includes(colorURL) ? colorURL : data.detalles[0].color
        );
        const detailSelected = detailsUnitys.includes(unityURL)
          ? colorsText.includes(colorURL)
            ? data.detalles.find(
                (detail) =>
                  detail.unidad === unityURL && detail.color === colorURL
              )
            : data.detalles.find((detail) => detail.unidad === unityURL)
          : data.detalles[0];
        setSelectedDetail(detailSelected);
        navigate(urlDetail(detailSelected));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (!product || product.id_producto !== id_producto) {
      fetchProducto();
    }
  }, [id_producto]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", height: "calc(100dvh - 180px)" }}>
        <CircularProgress style={{ margin: "100px" }} />
        <Typography>
          Cargando la informacion del producto {nombre_producto}...
        </Typography>
      </div>
    );
  }

  const handleDetailSelect = (detail) => {
    setSelectedDetail(detail);
  };
  const handleUnityChange = (event, newUnity) => {
    setUnity(newUnity);
    const colors = colorsAvailable(product.detalles, newUnity);
    setDetailsUnityColors(colors);
    if (colors.length && !colors.includes(color)) {
      setColor(colors[0]);
      setSelectedDetail(
        details.find(
          (detail) => detail.unidad === newUnity && detail.color === colors[0]
        )
      );
      navigate(
        `?unidad=${encodeURIComponent(newUnity)}&color=${encodeURIComponent(
          colors[0]
        )}`
      );
    } else if (colors.includes(color)) {
      setSelectedDetail(
        details.find(
          (detail) => detail.unidad === newUnity && detail.color === color
        )
      );
      navigate(
        `?unidad=${encodeURIComponent(newUnity)}&color=${encodeURIComponent(
          color
        )}`
      );
    } else {
      navigate(`?unidad=${encodeURIComponent(newUnity)}}`);
    }
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
    setSelectedDetail(
      details.find(
        (detail) => detail.unidad === unity && detail.color === e.target.value
      )
    );
    navigate(
      `?unidad=${encodeURIComponent(unity)}&color=${encodeURIComponent(
        e.target.value
      )}`
    );
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        minHeight: "calc(100dvh - 180px)",
      }}
    >
      <Bread_crumb
        categoria={product.categoria}
        nombreProducto={product.nombre}
        fabricanteProducto={product.fabricante}
      />
      <Grid container spacing={2} height={"100%"}>
        <Grid item xs={12} md={7}>
          <Carousel
            autoPlay={false}
            cycleNavigation
            animation="slide"
            navButtonsAlwaysVisible={selectedDetail.imagenes.length !== 0}
            indicators
            duration={500}
            IndicatorIcon={selectedDetail.imagenes.map((item, index) => (
              <img
                key={item.id_detalle}
                src={item.url}
                alt={item.nombre}
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "10px",
                  opacity: activeStep === index ? 1 : 0.5,
                  borderRadius: "10px",
                  border: activeStep === index ? "2px solid #1976d2" : "",
                  cursor: "pointer",
                }}
              />
            ))}
            activeStep={activeStep}
            onChange={handleStepChange}
          >
            {selectedDetail.imagenes.length !== 0 ? (
              selectedDetail.imagenes.map((imgDetalle, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    position: "relative",
                    height: isMobileOrTablet ? 300 : 544,
                  }}
                >
                  <img
                    src={imgDetalle.url}
                    alt={selectedDetail.nombre}
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "12px",
                      opacity: activeStep === index ? 1 : 0.5,
                    }}
                  />
                </Paper>
              ))
            ) : (
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  height: isMobileOrTablet ? 300 : 604,
                }}
              >
                <img
                  src={"/homeColorLucy1.png"}
                  alt={"producto_sin_imagen"}
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            )}
          </Carousel>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          gap={"10px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          component={Paper}
          sx={{ maxWidth: "400px !important", padding: "16px", margin: "auto" }}
        >
          <Typography variant="h3">{selectedDetail.nombre} </Typography>
          <Typography variant="h5" color="text.secondary">
            {product.fabricante}
          </Typography>
          <Typography variant="h4" sx={{ my: 2 }}>
            {numeral(selectedDetail.precio).format("$0,0.00")}
          </Typography>
          <Typography variant="body1">{selectedDetail.descripcion}</Typography>
          <Box display="flex" flexDirection="column" margin={"10px"}>
            <Typography variant="h7" color="text.secondary">
              Presentación: {selectedDetail.unidad}
            </Typography>
            <ToggleButtonGroup
              value={unity}
              size="medium"
              exclusive
              onChange={handleUnityChange}
              aria-label="Unidad"
            >
              {detailsUnity.map((detailUnity, index) => {
                return (
                  <ToggleButton
                    key={index}
                    value={detailUnity}
                    aria-label={"Presentacion " + detailUnity}
                  >
                    {detailUnity}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          {detailsColors.length !== 0 && (
            <Box margin={"10px"}>
              <FormControl>
                <FormLabel disabled>Color: {selectedDetail.color}</FormLabel>
                <RadioGroup row name="radio-buttons-group" value={color}>
                  {detailsColors.map((detailsColor, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={detailsColor}
                        control={
                          <Radio
                            checked={detailsColor === color}
                            size="medium"
                            onChange={handleColorChange}
                            disabled={
                              !detailsUnityColors.includes(detailsColor)
                            }
                            sx={{
                              color: detailsColorsHTML[index],
                              "&.Mui-checked": {
                                color: detailsColorsHTML[index],
                              },
                            }}
                          />
                        }
                        label={detailsColor}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          <Divider color="black" />
          <Button
            variant="contained"
            sx={{ paddingInline: "10px" }}
            startIcon={<AddShoppingCartIcon />}
            fullWidth
            onClick={() => {
              addItemToCart(product);
            }}
          >
            AÑADIR AL CARRITO
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ paddingInline: "10px" }}
            startIcon={<WhatsApp sx={{ color: "white" }} />}
            fullWidth
          >
            RECIBIR ASESORÍA
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
