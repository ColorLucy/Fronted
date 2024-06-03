import React, { useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMediaQuery } from '@mui/material';

const Whatsapp = () => {
    const [isVisible, setIsVisible] = useState(true);

    const isMobileOrTablet = useMediaQuery('(max-width: 960px)');

    const handleClick = () => {
        window.open('https://api.whatsapp.com/send?phone=573155176725', '_blank');
    };

    return (
        <div style={isVisible ? styles.container : {}}>
            <div style={{ ...styles.button, ...(isMobileOrTablet && styles.mobileButton) }} onClick={handleClick}>
                <WhatsAppIcon style={{ fontSize: isMobileOrTablet ? 30 : 45 }} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
    },
    button: {
        backgroundColor: '#25d366',
        color: 'white',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.75)',
    },
    mobileButton: {
        width: 40,
        height: 40,
    },
};

export default Whatsapp;
