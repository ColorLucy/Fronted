import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MenuPerfil from './MenuPerfil'; // Importa el componente del menú
import MiPerfil from './MiPerfil';
import MisPedidos from './MisPedidos';
import DetallePedido from './DetallePedido';

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <div className="userProfilePage" style={{ minHeight: "calc(100vh - 180px)", display: "flex" }}>
            <MenuPerfil userName={userName} handleLogout={handleLogout} /> {/* Renderiza el menú */}
            <div className="cardUserProfile" style={{ width: "75%" }}>
                <Routes>
                    {/* Ruta por defecto que muestra MiPerfil */}
                    <Route path="/" element={<MiPerfil />} />
                    <Route path="mi-perfil" element={<MiPerfil />} />
                    <Route path="mis-pedidos" element={<MisPedidos />} />
                    <Route path="mis-pedidos/:detalleId" element={<DetallePedido />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;
