import React from "react"
import {Button, Grid, Typography,Box, Container} from '@mui/material'
import { BsTiktok,BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function InfoBar() {
  
      
  return (
    
    <>
        <Grid container sx={{backgroundColor: '#2C2E33', display:'flex', minHeight:'100px', position: 'static', bottom: 0, left: 0, right: 0, marginTop: '20px'}} justifyContent="center" >
          {/* TItulo */}
          <Grid item   alignContent={'center'} color={'white'}>
            <Typography variant="body1" marginRight={10}>Contáctanos</Typography>
          </Grid>
          {/* Información de contacto */}
          <Grid item  alignContent={'center'}  marginRight={3} color={'white'}>
            
            <Typography>(315) 5176 725</Typography>
            <Typography>(310) 6813 723</Typography>
            <Typography>cra 16 #10-85, Cali, Valle del Cauca </Typography>
            
          </Grid>
          {/* redes sociales */}
          <Grid item   alignContent={'center'} color={'white'}>
            <Button color="inherit" 
                onClick={() => {
                  window.open('https://api.whatsapp.com/send/?phone=%2B573155176725&text&type=phone_number&app_absent=0', '_blank');
                }}
              >
              <BsWhatsapp size='30px' color='inherit'/>
            </Button>
            <Button color="inherit" 
              onClick={() => {
                window.open('https://www.facebook.com/PinturasColorlucy', '_blank');
              }}
            >
              <BsFacebook size='30px' color='inherit'/>
            </Button>
            <Button color="inherit" 
              onClick={() => {
                window.open('https://www.instagram.com/pinturas_colorlucy/', '_blank');
              }}
            >
              <BsInstagram size='30px' color='inherit'/>
            </Button>
            <Button color="inherit" 
              onClick={() => {
                window.open('https://www.tiktok.com/@pinturascolor_lucy?lang=es', '_blank');
              }}
            >
              <BsTiktok size='30px' color='inherit'/>
            </Button>
          </Grid>
        </Grid>
    </>
      
  )
}
