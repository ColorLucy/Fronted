import { useState } from 'react'
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import {Box,AppBar,Toolbar,Typography} from '@mui/material'
import NavigationBar from './navigation/navigationBar';
import Home from './navigation/home';
import AboutUs from './navigation/aboutUs';
import Products from './navigation/products';
import ShoppingCar from './navigation/shoppingCar';
import './App.css'

function App() {
  

  return (
    
     <Box sx={{ maxWidth: '100%' }}>
      <header>
      <Router>
            <div>
                <NavigationBar />
                <Routes path="/inicio" component={Home} />
                <Routes path="/nosotros" component={AboutUs} />
                <Routes path="/productos" component={Products} />
                <Routes path="/otra-pagina" component={ShoppingCar} />
            </div>
        </Router>
      </header>
    </Box>
   
  )
}

export default App
