import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Logo from '../components/logo';
import "./admin.css";
import AuthContext from '../context/AuthContext';



export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  let { loginUser } = useContext(AuthContext)
  return (
    <div className='adminPage'>
      <div className='cardLoginAdmin'>
        <Logo />
        <h2 style={{ color: "black", margin: "0", marginTop: "30px" }}>Hola, bienvenido!</h2>
        <p style={{ color: "grey", fontSize: "10px", margin: "0" }}>Ingresa tus credenciales para continuar</p>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex', flexDirection: "column", marginTop: "30px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Correo electrónico"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            type='email'
            value={loginData.email}
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            fullWidth
            required
          />

          <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" fullWidth>
            <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              required
              fullWidth
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


          <Button variant="contained" onClick={e => loginUser(e, loginData)} fullWidth style={{ maxWidth: "27ch", marginTop: "10px" }}>Enviar</Button>
        </Box>
      </div>
    </div>
  )
}
