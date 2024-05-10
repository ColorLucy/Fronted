import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo';
import { BarColors } from '../../components/NavigationBar';
import { FormHelperText } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signUpData, setSignUpData] = useState({ email: "", password: "", name: "", confirmPassword: "" })
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false);
    const navigate = useNavigate();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.post("/auth/signup/", signUpData).then(({ data }) => {
            console.log(data)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate("/")
        }).catch(e => console.log(e))

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
                </Box>
            </div>
        </div>
    )
}

export default SignUp