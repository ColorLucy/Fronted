import { Box, Button, Card, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import React from "react";
import { Link } from "react-router-dom";
import InfoBar from "../../components/InfoBar";
import WhatsApp from "../../components/WhatsApp";

export default function Home() {
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  return (
    <Box  >
      <Grid container spacing={2} justifyContent="end" alignItems="center" paddingTop={12} style={isMobileOrTablet ? { paddingLeft: '20px', paddingRight: '20px', marginTop: '40px' } : {}}>
        {/* Informacion empresa, a inicio de página, lado izquierdo */}
        <Grid item xs={12} md={5} alignContent={'center'}>
          <Typography sx={{ color: 'black', fontSize: isMobileOrTablet ? '30px' : '50px', fontStyle: 'italic' }}> Empresa de pintura automotriz</Typography>
          <Typography sx={{ color: 'black', fontSize: isMobileOrTablet ? '15px' : '20px' }}> Nos especializamos en combinaciones de pinturas.
          </Typography>
          <Typography sx={{ color: 'black', fontSize: isMobileOrTablet ? '12px' : '15px' }}> ¡Realizamos domicilios en Cali y sus alrededores!
          </Typography>
          <Button variant="contained" href="https://api.whatsapp.com/send/?phone=%2B573155176725&text=Hola,%20deseo%20asesor%C3%ADa&type=phone_number&app_absent=0" sx={{ backgroundColor: 'gray', marginTop: '30px' }} >Comprar</Button>
        </Grid >
        {/* Imagen a inicio de página, lado derecho */}
        <Grid item xs={12} md={6} alignContent={'center'} color={'white'} >

          <Card sx={{ maxWidth: 600, maxHeight: 400, marginTop: '10px' }}>
            <CardMedia

              component='img'
              image="homeColorLucy1.png"

            />
          </Card>
        </Grid>
        {/* Apartado de combinaciones */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '30px' : '40px', fontStyle: 'italic', textAlign: 'center' }}>Combinaciones</Typography>
          </Grid>
          {/* Imagenes de combinaciones */}
          <Grid item xs={12} md={7} display={'flex'} marginTop={5}>
            <Card sx={{ maxWidth: 300, maxHeight: 230, marginRight: '15px' }}>
              <CardMedia

                component='img'
                image="combinaciones1.png"

              />
            </Card>
            <Card sx={{ maxWidth: 300, maxHeight: 230, marginRight: '15px' }}>
              <CardMedia

                component='img'
                image="combinaciones2.png"

              />
            </Card>
            <Card sx={{ maxWidth: 230, maxHeight: 230 }}>
              <CardMedia
                component='img'
                image="combinaciones3.jpeg"

              />
            </Card>

          </Grid>

          <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '15px' : '20px', textAlign: 'center' }}>Colores realizados en ColorLucy, ven y solicita tu color con nosotros</Typography>
        </Grid>
        {/* apartado de productos */}
        <Grid container item xs={12} md={12} alignItems={'center'} justifyContent={'center'} marginTop='50px'>
          <Grid item >
            <Card sx={{ maxWidth: 230, maxHeight: 300 }}>
              <CardMedia
                component='img'
                image="aerosoles.png" />
            </Card>
          </Grid>
          <Grid item xs={8} md={5} alignItems={'center'}>
            <Typography sx={{ color: 'black', fontSize: isMobileOrTablet ? '30px' : '40px', fontStyle: 'italic', textAlign: 'center' }}>Encuentra los mejores productos para tu negocio.</Typography>
            <Button variant="outlined" component={Link} to="/productos" sx={{ borderColor: 'gray', color: 'gray', marginTop: '30px', marginLeft: '50px' }} >Ver más</Button>
          </Grid>

        </Grid>
        {/* Aliados */}
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={12}>
            <Typography marginTop='50px' sx={{ color: 'black', fontSize: isMobileOrTablet ? '20px' : '30px', fontStyle: 'italic', textAlign: 'center' }}>Contamos con los mejores aliados</Typography>
          </Grid>
          {/* logos marcas aliadas */}
          <Grid item xs={12} md={5} display={'flex'} marginTop={5}>
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
        {/* Barra inferior con información de contacto  */}
        <InfoBar />
        <WhatsApp />
      </Grid>
    </Box>

  )
}

