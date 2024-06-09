import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const MiPerfil = () => {
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        // Recuperar datos del usuario del almacenamiento local
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: '',
                confirmPassword: '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editMode && name !== 'email') {
            setUserInfo({
                ...userInfo,
                [name]: value,
            });
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        // Aquí puedes agregar la lógica para guardar los cambios, por ejemplo, enviándolos a un servidor.
        setEditMode(false);
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
        }
    };

    return (
        <Box
            sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',  // Centra el contenido horizontalmente
                gap: '20px',
                borderRadius: '8px',
                maxWidth: '600px',  // Limita el ancho máximo del contenedor principal
                margin: '0 auto'    // Centra el contenedor en la página
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '10px' }}>Mi Perfil</Typography>
            <Paper sx={{ padding: '20px', width: '100%', backgroundColor: '#f7f7f7' }}>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>Datos personales</Typography>
                <Box sx={{ maxWidth: '500px', marginBottom: '20px' }}>
                    <TextField
                        label="Nombre"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        disabled={!editMode}
                        fullWidth
                    />
                </Box>
                <Box sx={{ maxWidth: '500px', marginBottom: '20px' }}>
                    <TextField
                        label="Correo Electrónico"
                        name="email"
                        value={userInfo.email}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box sx={{ maxWidth: '500px', marginBottom: '20px' }}>
                    <TextField
                        label="Teléfono"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        fullWidth
                    />
                </Box>
                {editMode && (
                    <>
                        <Box sx={{ maxWidth: '500px', marginBottom: '20px' }}>
                            <TextField
                                label="Contraseña Actual"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={userInfo.password}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => togglePasswordVisibility('password')} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{ maxWidth: '500px', marginBottom: '20px' }}>
                            <TextField
                                label="Nueva contraseña"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => togglePasswordVisibility('confirmPassword')} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Box>
                    </>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {editMode ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Guardar Cambios
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                        >
                            Editar
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default MiPerfil;
