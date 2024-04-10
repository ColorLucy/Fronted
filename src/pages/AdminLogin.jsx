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
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/logo';
import AuthContext from '../context/AuthContext';
import "./admin.css";


/**
 * `AdminLogin` is a React component that renders a login form specifically for administrators.
 * It allows the admin to input their email and password to log in. The password field includes
 * a toggle to show/hide the password for user convenience.
 *
 * Utilizes the AuthContext for login functionality which abstracts the handling of authentication logic.
 *
 * @returns {JSX.Element} A JSX element that contains a form with email and password fields, along with a submit button to perform the login action.
 */
export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isInvalid = queryParams.get('invalid') === 'true';
  let { loginUser, logoutUser, loginError, setLoginError } = useContext(AuthContext)
  const [showLoginRedirect, setShowLoginRedirect] = useState(isInvalid);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className='adminPage'>
      <Snackbar
        open={showLoginRedirect}
        autoHideDuration={5000}
        TransitionComponent={Grow}
        onClose={() => {
          setShowLoginRedirect(false);
          logoutUser();
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >Lamentablemente, no pudimos verificar tu identidad. Por tu seguridad, por favor inicia sesión de nuevo.
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginError}
        autoHideDuration={5000}
        TransitionComponent={Grow}
        onClose={() => setLoginError(false)}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >Lo sentimos, ha habido un error. Por favor, inténtalo de nuevo.
        </Alert>
      </Snackbar>
      <div className='cardLoginAdmin'>
        <Logo />
        <h2 style={{ color: "black", margin: "0", marginTop: "40px" }}>Hola, bienvenido!</h2>
        <p style={{ color: "grey", fontSize: "10px", margin: "0" }}>Ingresa tus credenciales para continuar</p>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch', display: 'flex', flexDirection: "column", marginTop: "40px", gap: "10px" },
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

          <FormControl sx={{ m: 1 }} variant="filled" fullWidth >
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


          <Button variant="contained" onClick={e => loginUser(e, loginData)} fullWidth style={{ marginTop: "10px" }}>Enviar</Button>
        </Box>
      </div>
    </div>
  )
}
