import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, FilledInput, FormControl, Grow, IconButton, InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarColors } from '../../components/NavigationBar';
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
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
                navigate('/profile');
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error);
                setShowLoginError(true);
            });
    };
    // Manejador de éxito del inicio de sesión con Google
    const onGoogleLoginSuccess = async (response) => {
        const dataResponse = jwtDecode(response.credential); // Decodifica el token JWT
        await axiosInstance.post("/auth/google/", { email: dataResponse.email, name: dataResponse.name })
            .then(({ data }) => {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`; // Configura el token de acceso en los encabezados
                localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh })); // Guarda los tokens en localStorage
                localStorage.setItem('user', JSON.stringify(data.user)); // Guarda los datos del usuario en localStorage
                navigate('/profile'); // Navega a la página de perfil
            }).catch((e) => {
                console.error("Error al iniciar sesión con Google:", e);
                setShowLoginError(true); // Muestra el error de inicio de sesión
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
                <BarColors cantIntermediate={4} />
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
                {/* Componente GoogleLogin para el inicio de sesión con Google */}
                <GoogleLogin
                    onSuccess={onGoogleLoginSuccess} // Manejador de éxito
                    onError={() => {
                        setShowLoginError(true); // Manejador de error
                    }}
                    size='large'
                    width={"100%"}
                />

            </div>
        </div>
    )
}

export default SignIn;
