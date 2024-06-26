import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';

const MiPerfil = () => {
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserInfo({
                id: user.id,  // Aquí también
                name: user.name,
                email: user.email,
                password: '',
                confirmPassword: '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        const { id, name, password, confirmPassword } = userInfo;
        const updateData = { name };
        if (password && password === confirmPassword) {
            updateData.password = password;
        }
        axiosInstance.put(`auth/user/${id}/`, updateData)
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data));
                setUserInfo({ ...data, password: '', confirmPassword: '' });
                setEditMode(false);
            })
            .catch((e) => console.log(e));
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
                alignItems: 'center',
                gap: '20px',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '0 auto'
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
