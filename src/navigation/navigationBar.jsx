import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Menu, MenuItem, useMediaQuery, ListItemIcon, Popover, CircularProgress, List, ListItem, ListItemText, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Commerce from '@chec/commerce.js';

const NavigationBar = ({ onSelectCategory }) => {

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
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

  const handleOpenPopover1 = (event) => {
    setAnchorEl1(event.currentTarget); 
  };
    
  const handleClosePopover1 = () => {
    setAnchorEl1(null);
  };
    
  const handleOpenPopover2 = (event) => {
    setAnchorEl2(event.currentTarget); 
  };
    
  const handleClosePopover2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setAnchorEl1(null); 
      setAnchorEl2(null); 
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (categorySlug) => {
    onSelectCategory(categorySlug); 
    handleClosePopover1(null); 
    handleClosePopover2(null); 
  };
  

  return (
    <AppBar position="static">
      <Toolbar>
        {!isMobileOrTablet && (
          <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ColorLucy
          </Typography>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
          <Button
            color="inherit"
            aria-haspopup="true"
            aria-controls="productos-menu"
            onClick={handleOpenPopover1}
          >
            Productos
          </Button>
          <Popover
            open={Boolean(anchorEl1)} anchorEl={anchorEl1} onClose={handleClosePopover1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            style={{ 
              marginTop: '10px' ,
              maxHeight: '400px',
            }}
          >
            {loading ? (
              <CircularProgress style={{ margin: "50px" }}/>
              ) : (
                <>
                <MenuItem onClick={handleClosePopover1} component={Link} to="/productos" sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                  Todos los productos
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} onClick={() => handleCategoryClick(category.slug)} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                    {category.name}
                  </MenuItem>
                ))}
                </>
                )}
                </Popover>
                <TextField variant="standard" placeholder="Buscar" sx={{ mr: 2 }} />
                <Button color="inherit" component={Link} to="/otra-pagina">
                  <ListItemIcon>
                    <ShoppingCartIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                </Button>
                </>
                )}
                {isMobileOrTablet && (
                  <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    variant="contained" onClick={handleOpenPopover2}
                  >
                    <MenuIcon />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl2)} anchorEl={anchorEl2} onClose={handleClosePopover2}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      style={{ 
                        maxHeight: '400px',
                      }}
                    >
                      <List component="nav"> 
                        <ListItem component={Link} to="/" onClick={handleClosePopover2} style={{color:'black'}} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                          <ListItemText primary="Inicio" />
                        </ListItem>
                        <ListItem component={Link} to="/nosotros" onClick={handleClosePopover2} style={{color:'black'}} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                          <ListItemText primary="Nosotros"/>
                        </ListItem>
                        <ListItem component={Link} onClick={toggleProductos} style={{color:'black'}} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                          <ListItemText primary="Productos" />
                          {openProductos ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openProductos} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem component={Link} to="/productos" onClick={handleClosePopover2} style={{color:'black'}} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                              <ListItemText primary="Todos los productos" />
                            </ListItem>
                            {categories.map((category) => (
                            <ListItem key={category.id} onClick={() => handleCategoryClick(category.slug)} component={Link} to={`/productos/${category.slug}`} style={{color:'black'}} sx={{ "&:hover": { backgroundColor: "#0368a61a" } }}>
                              <ListItemText primary={category.name}/>
                            </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </List>
                    </Popover>
                    <div style={{ marginLeft: 'auto' }}>
                    <Button color="inherit" component={Link} to="/otra-pagina">
                        <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: 'white' }}/>
                        </ListItemIcon>
                    </Button>
                    </div>
                  </>
                )}
      </Toolbar>
    </AppBar>
    );
};

export default NavigationBar;