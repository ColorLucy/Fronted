import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Backdrop, CircularProgress, Divider, FormHelperText } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarColors } from '../../components/NavigationBar';
import axiosInstance from '../../utils/axiosInstance';

/**
 * Componente `SignUp` para el registro de usuarios.
 * Permite a los usuarios registrarse mediante un formulario con nombre, correo electrónico y contraseña.
 * También soporta el registro a través de Google usando Google OAuth.
 *
 * Utiliza estado local para manejar los datos del formulario y la visibilidad de la contraseña.
 * Los datos se envían a un servidor mediante peticiones POST para el registro básico y autenticación con Google.
 *
 * @returns {JSX.Element} Formulario de registro para usuarios.
 */
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signUpData, setSignUpData] = useState({ email: "", password: "", name: "", confirmPassword: "" })

    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showSignUpError, setShowSignUpError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onGoogleLoginSuccess = async (response) => {
        setLoading(true)
        const dataResponse = jwtDecode(response.credential)
        await axiosInstance.post("/auth/google/", { email: dataResponse.email, name: dataResponse.name })
            .then(({ data }) => {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate("/")
            }).catch(e => showSignUpError(true))
        setLoading(false)

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axiosInstance.post("/auth/signup/", signUpData).then(({ data }) => {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate("/")
        }).catch(e => showSignUpError(true))
        setLoading(false)
    }
    return (
        <div className='adminPage' style={{ height: "calc(100vh - 180px)" }}>
            <Snackbar
                open={false}
                autoHideDuration={5000}
                TransitionComponent={Grow}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >Lo sentimos, ha habido un error. Por favor, inténtalo de nuevo.
                </Alert>
            </Snackbar>
            <div className='cardLoginAdmin'>
                <h2 style={{ color: "black", margin: "0" }}>Registro</h2>
                <p style={{ color: "grey", fontSize: "10px", margin: "0", marginBottom: "20px" }}>Ingresa su información para continuar</p>
                <BarColors cantIntermediate={4} />
                <Box
                    component="form"
                    sx={{
                        display: 'flex', flexDirection: "column", gap: "5px", marginTop: "40px", alignItems: "center",
                        '& .MuiFormControl-root': { width: '34ch', margin: "6px" },
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Nombre completo"
                        variant="filled"
                        type='text'
                        autoComplete='name'
                        value={signUpData.name}
                        onChange={e => { setSignUpData({ ...signUpData, name: e.target.value }); setNameError(!e.target.validity.valid) }}
                        fullWidth
                        required
                        error={nameError}
                        helperText={
                            nameError ? "Por favor, ingrese su nombre utilizando únicamente letras y espacios." : ""
                        }
                        inputProps={{
                            pattern: "[A-Za-z ]+",
                        }}
                    />
                    <TextField
                        label="Correo electrónico"
                        variant="filled"
                        type='email'
                        autoComplete='email'
                        value={signUpData.email}
                        onChange={e => { setSignUpData({ ...signUpData, email: e.target.value }); setEmailError(!e.target.validity.valid) }}
                        fullWidth
                        required
                        helperText={emailError ? "Por favor, ingrese un correo electrónico válido." : ""}
                        error={emailError}
                        inputProps={{
                            type: "email",
                        }}
                    />

                    <FormControl variant="filled" fullWidth error={passwordError !== false}
                    >
                        <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                        <FilledInput
                            type={showPassword ? 'text' : 'password'}
                            value={signUpData.password}
                            required
                            autoComplete='new-password'
                            aria-describedby="component-helper-text"
                            onChange={e => {
                                setSignUpData({ ...signUpData, password: e.target.value })
                                setPasswordError(
                                    e.target.value.length < 6 ? "Por seguridad, la contraseña debe tener al menos 6 caracteres." :
                                        !/\d/.test(e.target.value) ? "La contraseña debe incluir al menos un número." :
                                            false
                                );
                            }}
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
                        <FormHelperText id="component-helper-text">
                            {passwordError}
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" fullWidth error={passwordValidationError !== false}>
                        <InputLabel htmlFor="filled-adornment-password" >Confirmar contraseña</InputLabel>
                        <FilledInput
                            type={showPassword ? 'text' : 'password'}
                            value={signUpData.confirmPassword}
                            required
                            autoComplete='new-password'
                            aria-describedby="component-helper-text-1"
                            onChange={e => {
                                setSignUpData({ ...signUpData, confirmPassword: e.target.value })
                                setPasswordValidationError(e.target.value !== signUpData.password.slice(0, e.target.value.length) ? "Las contraseñas no coinciden. Por favor, verifique que ambas sean iguales." : false);
                            }}
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
                        <FormHelperText id="component-helper-text-1">
                            {passwordValidationError}
                        </FormHelperText>
                    </FormControl>
                    <Button variant="contained" type='submit' fullWidth style={{ width: '37ch', margin: "15px" }}>Registrarse</Button>
                    <Divider variant="middle" sx={{ width: "90%", opacity: "1", color: "black" }} />
                    <GoogleLogin
                        onSuccess={onGoogleLoginSuccess}
                        onError={() => {
                            showSignUpError(true)
                        }}
                        size='large'
                        width={"100%"}
                    />
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                        onClick={(e) => setLoading(false)}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Snackbar
                        open={showSignUpError}
                        autoHideDuration={5000}
                        TransitionComponent={Grow}
                        onClose={() => {
                            setShowSignUpError(false);
                        }}
                    >
                        <Alert
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >Lamentablemente, no pudimos completar tu registro. Por favor, intenta nuevamente.
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </div>
    )
}

export default SignUp;
