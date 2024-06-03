import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Fade, IconButton, InputBase, ListItem, Paper, Popper, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import numeral from 'numeral';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const SearchBar = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [placement, setPlacement] = useState();
  const popperRef = useRef(null)

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClosePopper = () => {
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      popperRef.current &&
      !popperRef.current.contains(event.target) &&
      anchorEl &&
      !anchorEl.contains(event.target)
    ) {
      handleClosePopper();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  useEffect(() => {
    window.addEventListener('resize', handleClosePopper);

    return () => {
      window.removeEventListener('resize', handleClosePopper);
    };
  }, []);

  useEffect(() => {
    let cancel;
    const getSearchResults = async () => {
      if (searchTerm !== '') {
        setLoadingSearch(true);
        try {
          const response = await axiosInstance.get(`/products/search/?q=${searchTerm}`, {
            cancelToken: new axios.CancelToken((c) => {
              cancel = c;
            })
          });
          setSearchResults(response.data.results);
          setLoadingSearch(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Solicitud cancelada:', error.message);
            setLoadingSearch(true);
          } else {
            console.error('Error al obtener los resultados de búsqueda:', error);
            setLoadingSearch(true);
          }
        }
      } else {
        setSearchResults([]);
        setLoadingSearch(false);
      }
    };

    getSearchResults();

    return () => {
      // Cancelar la solicitud cuando el componente se desmonta o se actualiza
      if (cancel) {
        cancel();
      }
    };
  }, [searchTerm]);

  return (
    <>
      <Paper
        elevation={1}
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: isMobileOrTablet ? '100%' : 600,
          marginTop: isMobileOrTablet ? '16px' : '0',
        }}
        onClick={handleClick('bottom')}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar Producto"
          inputProps={{ 'aria-label': 'search product' }}
          value={searchTerm}
          name='searchTerm'
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              window.location.href = `/productos/?q=${encodeURIComponent(searchTerm)}`;
            }
          }}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => {
            setSearchTerm(searchTerm);
            handleClosePopper;
          }}
          component={Link}
          to={`/productos/?q=${searchTerm}`}
        >
          <SearchIcon />
        </IconButton>
        <Popper
          sx={{
            zIndex: 1200,
            maxWidth: '100%',
          }}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          ref={popperRef}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={400}>
              <Paper sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                width: isMobileOrTablet ? '100%' : 600,
                marginTop: '3px',
                '&::-webkit-scrollbar': {
                  width: '15px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                },
              }}>
                {loadingSearch ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div>
                    {searchResults.map((result) => (
                      <div key={result.id_producto}>
                        {result.detalles.length > 0 ? (
                          <ListItem
                            key={result.detalles[0].id_detalle}
                            component={Link}
                            to={`/productos/${encodeURIComponent(result.nombre)}-${result.id_producto}`}
                            onClick={() => {
                              handleClosePopper;
                            }}
                            sx={{ "&:hover": { backgroundColor: "#0368a61a" }, justifyContent: 'space-between' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                              <img
                                src={result.detalles[0].imagenes.length > 0 ? result.detalles[0].imagenes[0].url : "homeColorLucy1.png"}
                                alt={result.detalles[0].nombre}
                                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                              />

                              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>{result.detalles[0].nombre}</Typography>
                            </div>
                            <Typography variant="subtitle1" fontWeight="bold">{numeral(result.detalles[0].precio).format('$0,0.00')}</Typography>
                          </ListItem>
                        ) : null}
                      </div>
                    ))}
                    {searchResults.length === 0 && searchTerm !== '' && (
                      <Typography sx={{ p: 2 }}>No se encontraron resultados.</Typography>
                    )}
                  </div>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Paper>
    </>
  );
};

export default SearchBar;
