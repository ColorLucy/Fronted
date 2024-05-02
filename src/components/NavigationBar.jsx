import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, Button, CircularProgress, Collapse, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, Toolbar, useMediaQuery, Slide, Typography } from '@mui/material';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo, { generateIntermediateColors } from '../components/logo';
import Search from '../components/searchBar';
import "./components.css";
const colors = ['#EDC208', '#D7194A', '#0AA64D', '#0367A6', '#C63CA2'];

const NavigationBar = () => {

  const [drawerOpen1, setdrawerOpen1] = useState(false);
  const [drawerOpen2, setdrawerOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openProductos, setOpenProductos] = useState(false);
  const { pathname } = useLocation();
  const locationPath = pathname?.split("/")[1] ? pathname.split("/")[1] : ""
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  const expandedPalette = generateIntermediateColors(colors, isMobileOrTablet ? 5 : 14);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.01
      }
    }
  };
  const item = {
    hidden: { x: 2, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products/view-categories/')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.error('Error al obtener los datos de categorias:', error);
      });
  }, []);

  const toggleProductos = () => {
    setOpenProductos(!openProductos);
  };

  const handleToggleDrawer = () => {
    setdrawerOpen1(!drawerOpen1);
    setdrawerOpen2(!drawerOpen2);
  };

  const handleDrawerClose = () => {
    setdrawerOpen1(false);
    setdrawerOpen2(false);
  };

  return (
    <AppBar position="sticky" elevation={2} style={{ backgroundColor: "#F2F3F4" }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0px !important' }}>
        {!isMobileOrTablet && (
          <>
            <Logo imgSize="50px" />
            <Search />
            <Box sx={{ display: 'flex', alignItems: 'end', color: 'black' }}>
              <Button variant={locationPath === "" ? "contained" : ""} component={Link} to="/">Inicio</Button>
              <Button variant={locationPath === "nosotros" ? "contained" : ""} component={Link} to="/nosotros">Nosotros</Button>
              <Button
                variant={locationPath === "productos" ? "contained" : ""}
                onClick={handleToggleDrawer}
              >
                Productos
              </Button>
              <Drawer
                anchor="left"
                open={drawerOpen1}
                onClose={handleToggleDrawer}
                transitionDuration={500}
                sx={{
                  '& .MuiDrawer-paper': {
                    backgroundColor: '#0367a6',
                    '&::-webkit-scrollbar': {
                      width: '10px', 
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(255,255,255,0.5)', 
                      borderRadius: '10px', 
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: 'rgba(255,255,255,0.7)', 
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent', 
                    },
                  },
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleDrawerClose}>
                    <CloseIcon sx={{ color: 'white' }}/>
                  </Button>
                </div>
                <div style={{ width: 250 }}>
                  {loading ? (
                    <CircularProgress style={{ margin: "50px" }} />
                  ) : (
                    <>
                      <MenuItem onClick={handleToggleDrawer} component={Link} to="/productos" sx={{ "&:hover": { backgroundColor: "#ffffff1a" }, color: "white" }}>
                        <Typography variant="button">Todos los productos</Typography>
                      </MenuItem>
                      {categories.map((category, index) => (
                        <MenuItem key={index} onClick={handleToggleDrawer} component={Link} to={`/productos/?categoriaId=${category.id_categoria}&categoriaName=${encodeURIComponent(category.nombre)}`} sx={{ "&:hover": { backgroundColor: "#ffffff1a", color: "white" }, color: "white", marginLeft: '16px'}}>
                          <Typography variant="button">{category.nombre.charAt(0).toUpperCase() + category.nombre.slice(1).toLowerCase()}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  )}
                </div>
              </Drawer>
              <Button color="inherit" component={Link} to="/carrito">
                <ShoppingCartIcon sx={{ color: 'black' }} />
              </Button>
            </Box>
          </>
        )}
        {isMobileOrTablet && (
          <>
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{ marginRight: '4px', color: 'black' }}
              variant="contained" onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen2}
              onClose={handleToggleDrawer}
              transitionDuration={500}
              sx={{
                '& .MuiDrawer-paper': {
                  backgroundColor: '#0367a6',
                  '&::-webkit-scrollbar': {
                    width: '10px', 
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(255,255,255,0.5)', 
                    borderRadius: '10px', 
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(255,255,255,0.7)', 
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent', 
                    },
                },
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleDrawerClose}>
                  <CloseIcon sx={{ color: 'white' }}/>
                </IconButton>
              </div>
              <List>
                <ListItem selected={locationPath === ""} component={Link} to="/" onClick={handleToggleDrawer} style={{ color: 'white' }} sx={{ "&:hover": { backgroundColor: "#ffffff1a" } }}>
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem selected={locationPath === "nosotros"} component={Link} to="/nosotros" onClick={handleToggleDrawer} style={{ color: 'white' }} sx={{ "&:hover": { backgroundColor: "#ffffff1a" } }}>
                  <ListItemText primary="Nosotros" />
                </ListItem>
                <ListItem selected={locationPath === "productos"} onClick={toggleProductos} component={Link} style={{ color: 'white' }} sx={{ "&:hover": { backgroundColor: "#ffffff1a" } }}>
                  <ListItemText primary="Productos" />
                  {openProductos ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openProductos} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem component={Link} to="/productos" onClick={handleToggleDrawer} style={{ color: 'white' }} sx={{ "&:hover": { backgroundColor: "#ffffff1a" } }}>
                      <ListItemText primary="Todos los productos" />
                    </ListItem>
                    {categories.map((category) => (
                      <ListItem key={category.id_categoria} onClick={handleToggleDrawer} component={Link} to={`/productos/${category.id_categoria}`} style={{ color: 'white' }} sx={{ "&:hover": { backgroundColor: "#ffffff1a" } }}>
                        <ListItemText primary={category.nombre.charAt(0).toUpperCase() + category.nombre.slice(1).toLowerCase()} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Drawer>
            <div>
              <Logo imgSize="10px" />
            </div>
            <Button color="inherit" component={Link} to="/carrito">
              <ShoppingCartIcon sx={{ color: 'black' }} />
            </Button>
          </>
        )}
      </Toolbar>
      {isMobileOrTablet && (
        <Search />
      )}
      <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }} variants={container}
        initial="hidden"
        animate="visible">
        {expandedPalette.map((color, index) => (
          <motion.div
            key={index}
            variants={item}
            style={{
              backgroundColor: color,
              width: '100%',
              height: '4px',
              marginRight: '2px',
            }}
          />
        ))}
      </motion.div>
    </AppBar>
  );
};

export default NavigationBar;