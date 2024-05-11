import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarColors } from '../../components/NavigationBar';

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Obtener el nombre del usuario del almacenamiento local
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
        } else {
            // Si el nombre de usuario no está disponible, redirigir a la página de inicio de sesión
            navigate('/signin');
        }
    }, []);

    const handleLogout = () => {
        //limpiar el almacenamiento local y redirigir a la página de inicio de sesión.
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        navigate("/signin"); 
    };

    return (
        <div className="userProfilePage" style={{ height: "calc(100vh - 80px)" }}>
            <div className="cardUserProfile">
                
                <h2 style={{ color: "black", margin: "0" }}>Perfil de Usuario</h2>
                <p>Bienvenido, {userName}</p>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
};

export default Profile;
