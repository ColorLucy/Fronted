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
import { useLocation } from 'react-router-dom';
import Logo from '../../components/logo';
import { BarColors } from '../../components/NavigationBar';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signUpData, setSignUpData] = useState({ email: "", password: "", name: "", confirmPassword: "" })
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isInvalid = queryParams.get('invalid') === 'true';
    const [showLoginRedirect, setShowLoginRedirect] = useState(isInvalid);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


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
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Nombre completo"
                        variant="filled"
                        type='text'
                        value={signUpData.name}
                        onChange={e => setSignUpData({ ...signUpData, name: e.target.value })}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Correo electrónico"
                        variant="filled"
                        type='email'
                        value={signUpData.email}
                        onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
                        fullWidth
                        required
                    />

                    <FormControl variant="filled" fullWidth >
                        <InputLabel htmlFor="filled-adornment-password" >Contraseña</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={signUpData.password}
                            required
                            onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
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
                    <FormControl variant="filled" fullWidth >
                        <InputLabel htmlFor="filled-adornment-password" >Confirmar contraseña</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={signUpData.confirmPassword}
                            required
                            onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
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

                    <Button variant="contained" fullWidth style={{ width: '37ch', margin: "15px" }}>Enviar</Button>
                </Box>
            </div>
        </div>
    )
}

export default SignUp