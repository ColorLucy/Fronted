import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, FilledInput, FormControl, Grow, IconButton, InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isInvalid = queryParams.get('invalid') === 'true';
    const [showLoginError, setShowLoginError] = useState(isInvalid);
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignIn = () => {
        axiosInstance
          .post("/auth/login/", loginData)
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.access);
            navigate('/profile'); 
          })
          .catch((error) => {
            console.error("Error al iniciar sesión:", error);
            setShowLoginError(true); 
          });
    };
    

    return (
        <div className='adminPage' style={{ height: "calc(100vh - 180px)" }}>
            <Snackbar
                open={showLoginError}
                autoHideDuration={5000}
                TransitionComponent={Grow}
                onClose={() => setShowLoginError(false)}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >Correo o contraseña incorrecta. Por favor, inténtalo de nuevo.
                </Alert>
            </Snackbar>
            <div className='cardLoginAdmin'>
                <h2 style={{ color: "black", margin: "0" }}>Inicio de Sesión</h2>
                <p style={{ color: "grey", fontSize: "10px", margin: "0", marginBottom: "20px" }}>Ingresa tu información para iniciar sesión</p>
                <Box
                    component="form"
                    sx={{
                        display: 'flex', flexDirection: "column", gap: "5px", marginTop: "40px", alignItems: "center",
                        '& .MuiFormControl-root': { width: '34ch', margin: "6px" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Correo electrónico"
                        variant="filled"
                        type='email'
                        value={loginData.email}
                        onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        fullWidth
                        required
                    />

                    <FormControl variant="filled" fullWidth >
                        <InputLabel htmlFor="filled-adornment-password" >Contraseña</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={loginData.password}
                            required
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button variant="contained" fullWidth style={{ width: '37ch' }} onClick={handleSignIn}>Iniciar Sesión</Button>
                    <Link to="/registro" style={{ textDecoration: 'none', textAlign: "center" }}>
                        <p style={{ width: '37ch', margin: "15px" }}>Registrarse</p>
                    </Link>
                </Box>
            </div>
        </div>
    )
}

export default SignIn;
