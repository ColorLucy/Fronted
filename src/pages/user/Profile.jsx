import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarColors } from '../../components/NavigationBar';
import { Avatar } from '@mui/material';

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

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [avatarStyles, setAvatarStyles] = useState(null); // Nuevo estado para los estilos del avatar

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
            // Generar estilos del avatar usando el nombre de usuario
            const styles = stringAvatar(user.name);
            setAvatarStyles(styles);
        } else {
            navigate('/signin');
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <div className="userProfilePage" style={{ minHeight: "calc(100vh - 180px)", display: "flex" }}>
            <div className="leftMenu" style={{ width: "25%", backgroundColor: "#f2f2f2", padding: "20px",textAlign: "center" }}>
                <h2 style={{ color: "black" }}>Bienvenido</h2>
                {/* Renderiza el avatar con los estilos generados */}
                {avatarStyles && (
                    <Avatar
                        {...avatarStyles}
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: stringToColor(userName),
                            margin: "0 auto",
                            fontSize: "calc(38px * 1.2)" // Ajusta el tamaño de la fuente proporcionalmente al tamaño del avatar
                        }}
                    />
                )}
                <p style={{ margin: "10px 0" }}>Hola, {userName}</p>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ marginBottom: "10px" }}><button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Mi perfil</button></li>
                    <li style={{ marginBottom: "10px" }}><button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Mis pedidos</button></li>
                    <li style={{ marginBottom: "10px" }}><button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Actualizar mi información</button></li>
                    <li><button onClick={handleLogout} style={{ width: "100%", backgroundColor: "#f44336", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Cerrar sesión</button></li>
                </ul>
            </div>
            <div className="cardUserProfile" style={{ marginLeft: "20%" }}>
                {/* Aquí va el contenido principal del perfil */}
            </div>
        </div>
    );
};

export default Profile;
