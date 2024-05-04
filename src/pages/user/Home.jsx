import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Box, Button, Card, CardMedia, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";

export default function Home() {
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    combinaciones: false,
    productos: false,
    aliados: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const combinacionesElement = document.getElementById('combinaciones');
      const productosElement = document.getElementById('productos');
      const aliadosElement = document.getElementById('aliados');

      if (combinacionesElement) {
        const combinacionesRect = combinacionesElement.getBoundingClientRect();
        const isVisibleCombinaciones = combinacionesRect.top < window.innerHeight * 0.8;
        setIsVisible(prevState => ({ ...prevState, combinaciones: isVisibleCombinaciones }));
      }

      if (productosElement) {
        const productosRect = productosElement.getBoundingClientRect();
        const isVisibleProductos = productosRect.top < window.innerHeight * 0.8;
        setIsVisible(prevState => ({ ...prevState, productos: isVisibleProductos }));
      }

      if (aliadosElement) {
        const aliadosRect = aliadosElement.getBoundingClientRect();
        const isVisibleAliados = aliadosRect.top < window.innerHeight * 0.8;
        setIsVisible(prevState => ({ ...prevState, aliados: isVisibleAliados }));
      }
    };

    window.addEventListener('scroll', handleVisibility);

    return () => {
      window.removeEventListener('scroll', handleVisibility);
    };
  }, []);

  const animatedPropsCombinaciones = useSpring({
    opacity: isVisible.combinaciones ? 1 : 0,
    transform: `translateY(${isVisible.combinaciones ? 0 : +100}px)`,
    from: { opacity: 0, transform: 'translateY(+100px)' },
    config: { duration: 1000 },
  });

  const animatedPropsProductos = useSpring({
    opacity: isVisible.productos ? 1 : 0,
    transform: `translateY(${isVisible.productos ? 0 : +100}px)`,
    from: { opacity: 0, transform: 'translateY(+100px)' },
    config: { duration: 1000 },
  });

  const animatedPropsAliados = useSpring({
    opacity: isVisible.aliados ? 1 : 0,
    transform: `translateY(${isVisible.aliados ? 0 : +100}px)`,
    from: { opacity: 0, transform: 'translateY(+100px)' },
    config: { duration: 1000 },
  });

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center" paddingTop={2} style={isMobileOrTablet ? { paddingLeft: '10px', paddingRight: '10px' } : {}}>
        {/* Informacion empresa, a inicio de página, lado izquierdo */}
        <Grid item xs={12} style={{
          backgroundImage: `url('homeColorLucy1.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          zIndex: 0,
        }}>
          {/* Contenido de texto superpuesto */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={10} md={6} style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '5px' }}>
              <Typography variant={isMobileOrTablet ? 'h4' : 'h2'} gutterBottom>
                Empresa de pintura automotriz
              </Typography>
              <Typography variant={isMobileOrTablet ? 'body1' : 'h6'} gutterBottom>
                Nos especializamos en combinaciones de pinturas.
              </Typography>
              <Typography variant={isMobileOrTablet ? 'body2' : 'body1'} gutterBottom>
                ¡Realizamos domicilios en Cali y sus alrededores!
              </Typography>
              <Button variant="contained" href="https://api.whatsapp.com/send/?phone=%2B573155176725&text=Hola,%20deseo%20asesor%C3%ADa&type=phone_number&app_absent=0" sx={{ backgroundColor: 'white', marginTop: '30px', color: 'black', '&:hover': { color: 'white' } }}>Comprar</Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Apartado de combinaciones */}
        <animated.div style={animatedPropsCombinaciones}>
          <Grid container item xs={12} justifyContent="center" alignItems="center" id="combinaciones">
            <Grid item xs={12} md={12}>
              <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '30px' : '40px', fontStyle: 'italic', textAlign: 'center' }}>Combinaciones</Typography>
            </Grid>
            {/* Imágenes de combinaciones */}
            <Grid item container xs={12} md={12} marginTop={5} justifyContent="center" alignItems="center" gap={2}>
              <Grid item xs={12} md={3.5}>
                <Paper elevation={0} sx={{ maxWidth: '100%', height: '40vh', width: '100%', justifyContent: "center", display: "flex" }}>
                  <img src={"combinaciones1.png"} alt={"combinaciones1"}
                    style={{
                      width: "100%", maxHeight: "100%", objectFit: 'cover', borderRadius: "10px"
                    }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <Paper elevation={0} sx={{ maxWidth: '100%', height: '40vh', width: '100%', justifyContent: "center", display: "flex" }}>
                  <img src={"combinaciones2.png"} alt={"combinaciones2"}
                    style={{
                      width: "100%", maxHeight: "100%", objectFit: 'cover', borderRadius: "10px"
                    }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <Paper elevation={0} sx={{ maxWidth: '100%', height: '40vh', width: '100%', justifyContent: "center", display: "flex" }}>
                  <img src={"combinaciones3.jpeg"} alt={"combinaciones3"}
                    style={{
                      width: "100%", maxHeight: "100%", objectFit: 'cover', borderRadius: "10px"
                    }} />
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '15px' : '20px', textAlign: 'center' }}>Colores realizados en ColorLucy, ven y solicita tu color con nosotros</Typography>
            </Grid>
          </Grid>
        </animated.div>
        {/* Apartado de productos */}
        <animated.div style={animatedPropsProductos}>
          <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} marginTop='50px' id="productos">
            {/* Columna de la imagen */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center" 
        >
              <Paper elevation={0} sx={{ maxWidth: '530px', maxHeight: '600px', justifyContent: "center", display: "flex" }}>
                  <img src={"aerosoles.png"} alt={"aerosoles"}
                    style={{
                      width: "100%", maxHeight: "100%", objectFit: 'cover', borderRadius: "10px"
                    }} />
                </Paper>
            </Grid>
            {/* Columna del texto y botón */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <div style={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'black', fontSize: isMobileOrTablet ? '25px' : '40px', fontStyle: 'italic' }}>
                  Encuentra los mejores productos para tu negocio.
                </Typography>
              </div>
              <Button variant="outlined" component={Link} to="/productos" sx={{ borderColor: 'gray', color: 'gray', marginTop: '30px', maxWidth: '200px' }}>
                Ver más
              </Button>
            </Grid>
          </Grid>
        </animated.div>
        {/* Aliados */}
        <animated.div style={animatedPropsAliados}>
          <Grid container alignItems="center" justifyContent="center" id="aliados">
            <Grid item xs={12} md={12}>
              <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '20px' : '30px', fontStyle: 'italic', textAlign: 'center' }}>Contamos con los mejores aliados</Typography>
            </Grid>
            {/* logos marcas aliadas */}
            <Grid item xs={12} md={5} display={'flex'} >
              <Card sx={{ maxWidth: 300, maxHeight: 230, marginRight: '15px' }}>
                <CardMedia
                  component='img'
                  image="ppg.png"
                />
              </Card>
              <Card sx={{ maxWidth: 300, maxHeight: 230, marginRight: '15px' }}>
                <CardMedia
                  component='img'
                  image="ixell.png"
                />
              </Card>
            </Grid>
          </Grid>
        </animated.div>
      </Grid>
    </Box>
  )
}





