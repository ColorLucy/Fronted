import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Menu, MenuItem, useMediaQuery, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../components/logo';

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

        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {!isMobileOrTablet && (
                    <>
                        
                        
                        <Logo/>
                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <Button color="inherit" component={Link} to="/">Inicio</Button>
                            <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
                            <Button color="inherit" component={Link} to="/productos">Productos</Button>
                            <TextField variant="standard" placeholder="Buscar" sx={{ mr: 2 }} />
                            <Button color="inherit" component={Link} to="/otra-pagina">
                                <ShoppingCartIcon  sx={{ color: 'white' }}/>
                            </Button>
                        </div>
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
                            <MenuItem onClick={handleClose} component={Link} to="/otra-pagina">
                            <ListItemIcon>
                                <ShoppingCartIcon fontSize="small" />
                            </ListItemIcon>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>  
        
    );
};

export default NavigationBar;
