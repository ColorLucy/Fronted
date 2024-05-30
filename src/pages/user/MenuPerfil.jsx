import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const MenuPerfil = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [avatarStyles, setAvatarStyles] = useState(null);

    // Definición de la función stringToColor
    function stringToColor(string) {
        if (!string) return null;
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    // Definición de la función stringAvatar
    function stringAvatar(name) {
        return {
            children:
                name.split(" ").length > 1
                    ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
                    : `${name.split(" ")[0][0]}`,
        };
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
            const styles = stringAvatar(user.name);
            setAvatarStyles(styles);
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <div className="menuPerfil" style={{ width: "25%", backgroundColor: "#f2f2f2", padding: "20px", textAlign: "center", display: "flex", flexDirection: "column" }}>
            <h2 style={{ color: "black" }}>Bienvenido</h2>
            {avatarStyles && (
                <Avatar
                    {...avatarStyles}
                    sx={{
                        width: 80,
                        height: 80,
                        bgcolor: stringToColor(userName),
                        margin: "0 auto",
                        fontSize: "calc(38px * 1.2)"
                    }}
                />
            )}
            <p style={{ margin: "10px 0" }}>Hola, {userName}</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/profile/mi-perfil">
                        <button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                            Mi perfil
                        </button>
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/profile/mis-pedidos">
                        <button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                            Mis pedidos
                        </button>
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} style={{ width: "100%", backgroundColor: "#f44336", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default MenuPerfil;
