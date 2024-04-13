
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import {Button, Grid, Typography,Box} from '@mui/material'
import { BsTiktok,BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'
import Home from './navigation/Home';
import AboutUs from './navigation/AboutUs';
import Products from './navigation/Products';
import ShoppingCar from './navigation/ShoppingCar';
import NavigationBar from './navigation/navigationBar';

const Admin = () => {
  {/**
         * Paginas que requieren autenticacion de administrador
         */}
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />

      </Routes>
    </AuthProvider>
  )
}
function App() {

  const Homepage = () => {
    return (
      <>
        <NavigationBar/>
        <Routes>
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<ShoppingCar />} />
          <Route Component={Home} path="*" />
          
        </Routes>
      </>
      
    )
  }
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Homepage} path="*" />{/*aqui va el home de color lucy, cambiar por el componente HolaC*/ }
          
        </Routes>
      </Router>
      <Box sx={{ p: 2,  backgroundColor: '#2C2E33', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Grid container spacing={2} justifyContent="end" alignItems="center">
          {/* TItulo */}
          <Grid item xs={12} md={3} alignContent={'end'} color={'white'}>
            <Typography variant="body1" >Contáctanos</Typography>
          </Grid>
          {/* Información de contacto */}
          <Grid item xs={12} md={4} alignContent={'end'} color={'white'}>
            
            <Typography>(315) 5176 725</Typography>
            <Typography>(310) 6813 723</Typography>
            <Typography>cra 16 #10-85, Cali, Valle del Cauca </Typography>
            
          </Grid>
          {/* redes sociales */}
          <Grid item xs={12} md={3} color={'white'}>
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
    </Box>

    </div>
  )
}

export default App
