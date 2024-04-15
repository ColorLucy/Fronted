import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, MenuItem, useMediaQuery, CircularProgress, List, ListItem, ListItemText, Collapse, Box, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Commerce from '@chec/commerce.js';
import Logo from '../components/logo';

const NavigationBar = ({ onSelectCategory }) => {

  const [drawerOpen1, setdrawerOpen1] = useState(false);
  const [drawerOpen2, setdrawerOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openProductos, setOpenProductos] = useState(false);

  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');

  const commerce = new Commerce('pk_5672597a83b6b6dc1f2710eab13845691c6bbfade188b');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data: categoriesData } = await commerce.categories.list();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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

  const handleCategoryClick = (categorySlug) => {
    onSelectCategory(categorySlug);
    setdrawerOpen2(false);
  };


  return (
    <AppBar position="sticky" elevation={2} style={{ backgroundColor: '#ffd314' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0px !important', backgroundColor: '#ffd314' }}>
        {!isMobileOrTablet && (
          <>
            <Logo imgSize="50px" />
            <Paper
              elevation={1}
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar Producto"
                inputProps={{ 'aria-label': 'search product' }} />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
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
                        <MenuItem key={category.id} onClick={handleToggleDrawer} component={Link} to={`/productos/${category.slug}`} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                          {category.name}
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
                      <ListItem key={category.id} onClick={() => handleCategoryClick(category.slug)} style={{ color: 'black' }} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                        <ListItemText primary={category.name} />
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
    </AppBar>
  );
};

export default NavigationBar;