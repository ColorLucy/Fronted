import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Paper, Toolbar, useMediaQuery } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const isMobileOrTablet = useMediaQuery('(max-width: 960px)');

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <AppBar position="fixed"  elevation={2} >
            <Toolbar sx={{  justifyContent: 'space-between',  padding:'0px !important', backgroundColor:'#ffd314'}} >
                {!isMobileOrTablet && (
                    <>
                        
                        
                        <Logo imgSize="50px" />
                        <Paper 
                            elevation={1}
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1}}
                                placeholder="Buscar Producto"
                                inputProps={{ 'aria-label': 'search product' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        
                        <Box sx={{ display: 'flex', alignItems: 'end', color:'black' }}>
                            <Button color="inherit" component={Link} to="/">Inicio</Button>
                            <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
                            <Button color="inherit" component={Link} to="/productos">Productos</Button>
                            
                            <Button color="inherit" component={Link} to="/carrito">
                                <ShoppingCartIcon  color='inherit'/>
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
                            sx={{ marginRight:'4px', color:'black'}}
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component={Link} to="/">Inicio</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/nosotros">Nosotros</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/productos">Productos</MenuItem>
                        </Menu>
                        
                        <Paper 
                            elevation={1}
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1}}
                                placeholder="Buscar Producto"
                                inputProps={{ 'aria-label': 'search product' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Button color="inherit" component={Link} to="/carrito">
                                <ShoppingCartIcon  sx={{ color: 'black' }}/>
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>  
        
    );
};

export default NavigationBar;
