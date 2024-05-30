import React, { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const MiPerfil = () => {
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'Usuario Ejemplo',
        email: 'usuario@example.com',
        phone: '123-456-7890',
        password: 'Contraseña',
        confirmPassword: 'Contraseña',
    });

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
                gap: '20px',
                borderRadius: '8px',
            }}
        >
            <h2>Mi Perfil</h2>
            <h3>Datos personales</h3>
            <TextField
                label="Nombre"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
            />
            <TextField
                label="Correo Electrónico"
                name="email"
                value={userInfo.email}
                disabled
                fullWidth
            />
            <TextField
                label="Teléfono"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
            />
            {editMode && (
                <>
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
                </>
            )}
            {editMode ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Guardar Cambios
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleEdit}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Editar
                </Button>
            )}
        </Box>
    );
};

export default MiPerfil;
