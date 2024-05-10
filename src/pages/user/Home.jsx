import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  getHomeInfo,
  getStartImages,
  getCombinationsImages,
  getProductsImages,
  getAlliesImages,
} from "../../utils/information";

export default function Home() {
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");

  const [textInfo, setTextInfo] = useState({});
  const [startImages, setStartImages] = useState([]);
  const [loadingStart, setLoadingStart] = useState(true);
  const [combinationsImages, setCombinationsImages] = useState([]);
  const [loadingCombinations, setLoadingCombinations] = useState(true);
  const [productsImages, setProductsImages] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [alliesImages, setAlliesImages] = useState([]);
  const [loadingAllies, setLoadingAllies] = useState(true);

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    combinaciones: false,
    productos: false,
    aliados: false,
  });

  const StyledCard = styled(Card)({
    border: "none",
    boxShadow: "none",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const combinacionesElement = document.getElementById("combinaciones");
      const productosElement = document.getElementById("productos");
      const aliadosElement = document.getElementById("aliados");

      if (combinacionesElement) {
        const combinacionesRect = combinacionesElement.getBoundingClientRect();
        const isVisibleCombinaciones =
          combinacionesRect.top < window.innerHeight * 0.8;
        setIsVisible((prevState) => ({
          ...prevState,
          combinaciones: isVisibleCombinaciones,
        }));
      }

      if (productosElement) {
        const productosRect = productosElement.getBoundingClientRect();
        const isVisibleProductos = productosRect.top < window.innerHeight * 0.8;
        setIsVisible((prevState) => ({
          ...prevState,
          productos: isVisibleProductos,
        }));
      }

      if (aliadosElement) {
        const aliadosRect = aliadosElement.getBoundingClientRect();
        const isVisibleAliados = aliadosRect.top < window.innerHeight * 0.8;
        setIsVisible((prevState) => ({
          ...prevState,
          aliados: isVisibleAliados,
        }));
      }
    };

    window.addEventListener("scroll", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const fetchTextInfo = async () => {
      const data = await getHomeInfo();
      setTextInfo(data[0]);
      console.log("Home Text: ", data[0]);
    };
    const fetchStartImages = async () => {
      const data = await getStartImages();
      setStartImages(data);
      console.log("Start: ", data);
      setLoadingStart(false);
    };
    const fetchCombinationsImages = async () => {
      const data = await getCombinationsImages();
      setCombinationsImages(data);
      console.log("Combinations: ", data);
      setLoadingCombinations(false);
    };
    const fetchProductsImages = async () => {
      const data = await getProductsImages();
      setProductsImages(data);
      console.log("Products: ", data);
      setLoadingProducts(false);
    };
    const fetchAlliesImages = async () => {
      const data = await getAlliesImages();
      setAlliesImages(data);
      setLoadingAllies(false);
      // console.log("Allies: ", data);
    };
    fetchTextInfo();
    fetchStartImages();
    fetchCombinationsImages();
    fetchProductsImages();
    fetchAlliesImages();
  }, []);

  const animatedPropsCombinaciones = useSpring({
    opacity: isVisible.combinaciones ? 1 : 0,
    transform: `translateY(${isVisible.combinaciones ? 0 : +100}px)`,
    from: { opacity: 0, transform: "translateY(+100px)" },
    config: { duration: 1000 },
  });

  const animatedPropsProductos = useSpring({
    opacity: isVisible.productos ? 1 : 0,
    transform: `translateY(${isVisible.productos ? 0 : +100}px)`,
    from: { opacity: 0, transform: "translateY(+100px)" },
    config: { duration: 1000 },
  });

  const animatedPropsAliados = useSpring({
    opacity: isVisible.aliados ? 1 : 0,
    transform: `translateY(${isVisible.aliados ? 0 : +100}px)`,
    from: { opacity: 0, transform: "translateY(+100px)" },
    config: { duration: 1000 },
  });

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
        style={
          isMobileOrTablet ? { paddingLeft: "10px", paddingRight: "10px" } : {}
        }
      >
        {/* Informacion empresa, a inicio de página, lado izquierdo */}
        {loadingStart ? (
          <></>
        ) : (
          <Grid
            item
            xs={12}
            style={{
              backgroundImage: `url(${startImages[0].url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              zIndex: 0,
            }}
          >
            {/* Contenido de texto superpuesto */}
            <Grid container justifyContent="center" alignItems="center">
              <Grid
                item
                xs={10}
                md={6}
                style={{
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  variant={isMobileOrTablet ? "h4" : "h2"}
                  gutterBottom
                >
                  {textInfo.start_title}
                </Typography>
                <Typography
                  variant={isMobileOrTablet ? "body1" : "h6"}
                  gutterBottom
                >
                  {textInfo.start_text_one}
                </Typography>
                <Typography
                  variant={isMobileOrTablet ? "body2" : "body1"}
                  gutterBottom
                >
                  {textInfo.start_text_two}
                </Typography>
                <Button
                  variant="contained"
                  href="https://api.whatsapp.com/send/?phone=%2B573155176725&text=Hola,%20deseo%20asesor%C3%ADa&type=phone_number&app_absent=0"
                  sx={{
                    backgroundColor: "white",
                    marginTop: "30px",
                    color: "black",
                    "&:hover": { color: "white" },
                  }}
                >
                  Comprar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Apartado de combinaciones */}
        <animated.div style={animatedPropsCombinaciones}>
          <Grid
            id="combinaciones"
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={12}>
              <Typography
                marginTop="50px"
                sx={{
                  color: "black",
                  fontSize: isMobileOrTablet ? "30px" : "40px",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {textInfo.combinations_title}
              </Typography>
            </Grid>
            {/* Imágenes de combinaciones */}
            <Grid
              item
              container
              xs={12}
              md={12}
              marginTop={5}
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              {startImages == null ? (
                <h3>{":("}</h3>
              ) : (
                combinationsImages.map((image, index) => (
                  <Grid key={index} item xs={12} md={3.5}>
                    <Paper
                      elevation={0}
                      sx={{
                        maxWidth: "100%",
                        height: "50vh",
                        width: "100%",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`combinaciones${index + 1}`}
                        style={{
                          width: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                marginTop="50px"
                sx={{
                  color: "black",
                  fontSize: isMobileOrTablet ? "15px" : "20px",
                  textAlign: "center",
                }}
              >
                {textInfo.combinations_text}
              </Typography>
            </Grid>
          </Grid>
        </animated.div>
        {/* Apartado de productos */}
        <animated.div style={animatedPropsProductos}>
          <Grid
            id="productos"
            container
            item
            xs={12}
            alignItems={"center"}
            justifyContent={"center"}
            marginTop="50px"
          >
            {/* Columna de la imagen */}
            {loadingProducts ? (
              <></>
            ) : (
              <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Paper
                  elevation={0}
                  sx={{
                    maxWidth: "530px",
                    maxHeight: "600px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <img
                    src={productsImages[0].url}
                    alt={"aerosoles"}
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Paper>
              </Grid>
            )}
            {/* Columna del texto y botón */}
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <div style={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    color: "black",
                    fontSize: isMobileOrTablet ? "25px" : "40px",
                    fontStyle: "italic",
                  }}
                >
                  {textInfo.products_text}
                </Typography>
              </div>
              <Button
                variant="outlined"
                component={Link}
                to="/productos"
                sx={{
                  borderColor: "gray",
                  color: "gray",
                  marginTop: "30px",
                  maxWidth: "200px",
                }}
              >
                Ver más
              </Button>
            </Grid>
          </Grid>
        </animated.div>
        {/* Aliados */}
        <animated.div style={animatedPropsAliados}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            id="aliados"
          >
            <Grid item xs={12} md={12}>
              <Typography
                marginTop="50px"
                sx={{
                  color: "black",
                  fontSize: isMobileOrTablet ? "20px" : "30px",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {textInfo.allies_text}
              </Typography>
            </Grid>
            {/* logos marcas aliadas */}
            <Grid item xs={12} md={5} display={"flex"}>
              {alliesImages == null ? (
                <h3>{":("}</h3>
              ) : (
                alliesImages.map((image, index) => (
                  <StyledCard
                    key={index}
                    sx={{
                      maxWidth: 300,
                      maxHeight: 230,
                      marginRight: "16px",
                    }}
                  >
                    <CardMedia component="img" image={image.url} />
                  </StyledCard>
                ))
              )}
            </Grid>
          </Grid>
        </animated.div>
      </Grid>
    </Box>
  );
}
