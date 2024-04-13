import React from "react"
import { AppBar,Grid, Toolbar, Card , CardMedia, Typography, IconButton, Button, TextField, Menu, MenuItem, useMediaQuery, Box,Paper } from '@mui/material';
import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
export default function Home() {
  
      
  return (
    
    <Box  >
      <Grid container spacing={2} justifyContent="end" alignItems="center" >
        <Grid item xs={12} md={5} alignContent={'center'}>
          <Typography sx={{color:'black', fontSize:'50px', fontStyle:'italic'}}> Empresa de pintura automotriz</Typography>
          <Typography sx={{color:'black', fontSize:'20px'}}> Nos especializamos en combinaciones de pinturas
          </Typography>
          <Button variant="contained" component={Link} to="/productos" sx={{backgroundColor:'gray', marginTop:'30px'}} >Comprar</Button>
        </Grid >
        <Grid item xs={12} md={6} alignContent={'center'} color={'white'}>
          
          <Card sx={{ maxWidth: 600, marginTop:'10px'}}>
            <CardMedia

              component='img'
              width={700}
              height={400}
              image="src/components/homeColorLucy1.png"
              
            />
          </Card>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography sx={{ textAlign: 'center' }}>Combinaciones</Typography> </Grid>
        </Grid>
      

          {/* Barra inferior con información de contacto  */}
          <InfoBar/>
      </Grid>
      
      
    </Box>
    
        


   
  )
}

