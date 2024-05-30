import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route} from 'react-router-dom';
import MiPerfil from './MiPerfil';
import MisPedidos from './MisPedidos';
import MenuPerfil from './MenuPerfil'; // Importa el componente del menú

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
                    <Route path="mi-perfil" element={<MiPerfil />} />
                    <Route path="mis-pedidos" element={<MisPedidos />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;
