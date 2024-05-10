import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoBar from "../../components/InfoBar";
import WhatsApp from "../../components/WhatsApp";
import {
  getHomeInfo,
  getStartImages,
  getCombinationsImages,
  getProductsImages,
  getAlliesImages,
} from "../../utils/information";

const StyledCard = styled(Card)({
  border: "none",
  boxShadow: "none",
});

export default function Home() {
  const [textInfo, setTextInfo] = useState({});
  const [startImages, setStartImages] = useState([]);
  const [combinationsImages, setCombinationsImages] = useState([]);
  const [productsImages, setProductsImages] = useState([]);
  const [alliesImages, setAlliesImages] = useState([]);
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");

  useEffect(() => {
    const fetchTextInfo = async () => {
      const data = await getHomeInfo();
      setTextInfo(data[0]);
      // console.log("Home Text: ", data[0]);
    };
    const fetchStartImages = async () => {
      const data = await getStartImages();
      setStartImages(data);
      // console.log("Start: ", data);
    };
    const fetchCombinationsImages = async () => {
      const data = await getCombinationsImages();
      setCombinationsImages(data);
      // console.log("Combinations: ", data);
    };
    const fetchProductsImages = async () => {
      const data = await getProductsImages();
      setProductsImages(data);
      // console.log("Products: ", data);
    };
    const fetchAlliesImages = async () => {
      const data = await getAlliesImages();
      setAlliesImages(data);
      // console.log("Allies: ", data);
    };
    fetchTextInfo();
    fetchStartImages();
    fetchCombinationsImages();
    fetchProductsImages();
    fetchAlliesImages();
  }, []);

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="end"
        alignItems="center"
        paddingTop={12}
        style={isMobileOrTablet ? {} : {}}
      >
        {/* Informacion empresa, a inicio de página, lado izquierdo */}
        <Grid item xs={12} md={5} justifyContent={"center"}>
          <Typography
            sx={{
              color: "black",
              fontSize: isMobileOrTablet ? "30px" : "50px",
              fontStyle: "italic",
              textAlign: isMobileOrTablet ? "center" : "center",
            }}
          >
            {/* Título */}
            {textInfo.start_title}
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontSize: isMobileOrTablet ? "15px" : "20px",
              textAlign: isMobileOrTablet ? "center" : "center",
            }}
          >
            {/* Texto 1 */}
            {textInfo.start_text_one}
          </Typography>
          <Typography
            align="center"
            sx={{
              color: "black",
              fontSize: isMobileOrTablet ? "12px" : "15px",
            }}
          >
            {/* Texto 2 */}
            {textInfo.start_text_two}
          </Typography>
          <Typography align="center">
            <Button
              variant="contained"
              href="https://api.whatsapp.com/send/?phone=%2B573155176725&text=Hola,%20deseo%20asesor%C3%ADa&type=phone_number&app_absent=0"
              sx={{
                backgroundColor: "#0367A3",
                marginTop: "1rem",
              }}
            >
              Comprar
            </Button>
          </Typography>
        </Grid>
        {/* Imagen a inicio de página, lado derecho */}
        <Grid item xs={12} md={6} alignContent={"center"} color={"white"}>
          {startImages == null ? (
            <h3>{":("}</h3>
          ) : (
            startImages.map((image, index) => (
              <StyledCard
                key={index}
                sx={{
                  maxWidth: "40vw",
                  maxHeight: "100vh",
                  margin: "0 auto",
                  marginTop: "10px",
                }}
              >
                <CardMedia component="img" image={image.url} />
              </StyledCard>
            ))
          )}
        </Grid>
        {/* Apartado de combinaciones */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          padding={"0 2rem"}
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
              {/* Título */}
              {textInfo.combinations_title}
            </Typography>
          </Grid>
          {/* Imagenes de combinaciones */}
          <Grid
            item
            xs={12}
            md={7}
            display={"flex"}
            marginTop={"2rem"}
            alignItems={"center"}
          >
            {combinationsImages == null ? (
              <h3>{":("}</h3>
            ) : (
              combinationsImages.map((image, index) => (
                <StyledCard
                  key={index}
                  sx={{ maxWidth: 300, maxHeight: 230, marginRight: "1rem" }}
                >
                  <CardMedia component="img" image={image.url} />
                </StyledCard>
              ))
            )}
          </Grid>

          <Typography
            marginTop="3rem"
            sx={{
              color: "black",
              fontSize: isMobileOrTablet ? "1rem" : "1.25rem",
              textAlign: "center",
            }}
          >
            {/* Texto 1 */}
            {textInfo.combinations_text}
          </Typography>
        </Grid>
        {/* Apartado de Productos */}
        <Grid
          container
          item
          xs={12}
          md={12}
          alignItems="center"
          justifyContent="center"
          marginTop="50px"
        >
          <Grid item>
            {productsImages == null ? (
              <h3>{":("}</h3>
            ) : (
              productsImages.map((image, index) => (
                <StyledCard
                  key={index}
                  sx={{ maxWidth: 230, maxHeight: 300, marginBottom: "1rem" }}
                >
                  <CardMedia component="img" image={image.url} />
                </StyledCard>
              ))
            )}
          </Grid>
          <Grid item xs={8} md={5} alignItems="center" justifyContent="center">
            <Typography
              sx={{
                color: "black",
                fontSize: isMobileOrTablet ? "2rem" : "2.5rem",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {/* Texto */}
              {textInfo.products_text}
            </Typography>
            <Typography align="center">
              <Button
                variant="outlined"
                component={Link}
                to="/productos"
                sx={{
                  borderColor: "gray",
                  color: "gray",
                  marginTop: "2rem",
                }}
              >
                Ver más
              </Button>
            </Typography>
          </Grid>
        </Grid>
        {/* Aliados */}
        <Grid container alignItems="center" justifyContent="center">
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
          {/* Logos marcas aliadas */}
          <Grid
            item
            xs={12}
            md={8}
            display={"flex"}
            marginTop={"1rem"}
            alignItems="center"
            justifyContent="center"
          >
            {alliesImages == null ? (
              <h3>{":("}</h3>
            ) : (
              alliesImages.map((image, index) => (
                <StyledCard
                  key={index}
                  sx={{
                    maxWidth: 300,
                    maxHeight: 230,
                    marginRight: "1rem",
                  }}
                >
                  <CardMedia component="img" image={image.url} />
                </StyledCard>
              ))
            )}
          </Grid>
        </Grid>
        {/* Barra inferior con información de contacto  */}
        <InfoBar />
        <WhatsApp />
      </Grid>
    </Box>
  );
}