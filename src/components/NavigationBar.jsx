import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, Button, CircularProgress, Collapse, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, Paper, Toolbar, useMediaQuery, Popper, Typography, Fade } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo, { generateIntermediateColors } from '../components/logo';
import "./components.css";
const colors = ['#EDC208', '#D7194A', '#0AA64D', '#0367A6', '#C63CA2'];

const NavigationBar = () => {

  const [drawerOpen1, setdrawerOpen1] = useState(false);
  const [drawerOpen2, setdrawerOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [openProductos, setOpenProductos] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  const expandedPalette = generateIntermediateColors(colors, isMobileOrTablet ? 14 : 20);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  useEffect(() => {
    window.addEventListener('resize', handleClosePopper);

    return () => {
      window.removeEventListener('resize', handleClosePopper);
    };
  }, []);

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
        console.log('Categorias:', response.data);
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

  const handleClosePopper = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    performSearch(event.target.value);
  };

  const performSearch = async (value) => {
    setLoadingSearch(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/products/search/?q=${value}`);
      setSearchResults(response.data);
      setLoadingSearch(false);
      console.log(value)
      console.log(response.data)
    } catch (error) {
      setLoadingSearch(false);
      console.error('Error al buscar productos:', error);
    }
  };;

  return (
    <AppBar position="sticky" elevation={2} style={{ backgroundColor: "#F2F3F4" }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0px !important' }}>
        {!isMobileOrTablet && (
          <>
            <Logo imgSize="50px" />
            <Paper
              elevation={1}
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              onClick={handleClick('bottom')}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar Producto"
                inputProps={{ 'aria-label': 'search product' }}
                value={searchTerm}
                onChange={handleSearchChange}
                />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={400}>
                    <Paper sx={{ marginTop: '3px', width: '400px', maxHeight:'400px', overflowY: 'auto' }}>
                      {loading ? ( // Mostrar indicador de progreso si está cargando
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
                          <CircularProgress />
                        </div>
                      ) : (
                        <div> {/* Mostrar resultados de búsqueda */}
                          {searchResults.map((result) => (
                            <ListItem key={result.id} component={Link} to={`/productos/${result.id}`} onClick={handleClosePopper} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                              <Typography key={result.id} sx={{ p: 2 }}>{result.nombre}</Typography>
                            </ListItem>
                          ))}
                          {searchResults.length === 0 && (
                            <Typography sx={{ p: 2 }}>No se encontraron resultados.</Typography>
                          )}
                        </div>
                      )}
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Paper>
            <Box sx={{ display: 'flex', alignItems: 'end', color: 'black' }}>
              <Button color="inherit" component={Link} to="/">Inicio</Button>
              <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
              <Button
                color="inherit"
                onClick={handleToggleDrawer}
              >
                Productos
              </Button>
              <Drawer
                anchor="left"
                open={drawerOpen1}
                onClose={handleToggleDrawer}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={handleDrawerClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div style={{ width: 250 }}>
                  {loading ? (
                    <CircularProgress style={{ margin: "50px" }} />
                  ) : (
                    <>
                      <MenuItem onClick={handleToggleDrawer} component={Link} to="/productos" sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                        Todos los productos
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} onClick={handleToggleDrawer} component={Link} to={`/productos/${category.id_categoria}`} sx={{ "&:hover": { backgroundColor: "#0368a61a", color: "black" } }}>
                          {category.nombre.charAt(0).toUpperCase() + category.nombre.slice(1).toLowerCase()}
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
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleDrawerClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <List>
                <ListItem component={Link} to="/" onClick={handleToggleDrawer} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem component={Link} to="/nosotros" onClick={handleToggleDrawer} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                  <ListItemText primary="Nosotros" />
                </ListItem>
                <ListItem onClick={toggleProductos} component={Link} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                  <ListItemText primary="Productos" />
                  {openProductos ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openProductos} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem component={Link} to="/productos" onClick={handleToggleDrawer} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                      <ListItemText primary="Todos los productos" />
                    </ListItem>
                    {categories.map((category) => (
                      <ListItem key={category.id} onClick={handleToggleDrawer} component={Link} to={`/productos/${category.id_categoria}`} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
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
        <Paper
          position="fixed"
          elevation={1}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'auto', margin: '10px' }}>
          <InputBase
            sx={{ ml: 1, flex: 1, alignItems: 'center', minWidth: '200px' }}
            placeholder="Buscar Producto"
            inputProps={{ 'aria-label': 'search product' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      )}
      <motion.div style={{ display: 'flex', alignItems: 'center' }} variants={container}
        initial="hidden"
        animate="visible">
        {expandedPalette.map((color, index) => (
          <motion.div
            key={index}
            variants={item}
            style={{
              backgroundColor: color,
              width: '15px',
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