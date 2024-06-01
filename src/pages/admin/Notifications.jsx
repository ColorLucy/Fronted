import React, { useEffect, useState } from 'react';
import { Box, Typography, Switch, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { theme } from "../../styles/theme";
import dayjs from 'dayjs';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import image from '../../../public/logoTemp.webp';

export default function Notifications({ modifyTitle }) {
    const [notifications, setNotifications] = useState([]);
    const [showUnread, setShowUnread] = useState(false);

    useEffect(() => {
        modifyTitle("Notificaciones");

        axiosInstance.get(`/shopping/notifications/`)
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    const handleSwitchChange = () => {
        setShowUnread(!showUnread);
    };

    const handleClick = (notification) => {
        console.log("Clicked notification:", notification);
        // Aquí puedes realizar cualquier acción que desees al hacer clic en la notificación
    };

    const filteredNotifications = showUnread 
        ? notifications.filter(notification => !notification.read) 
        : notifications;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: 2 }}>
                <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
                    <Typography variant="body1">Mostrar solo las no leídas</Typography>
                    <Switch
                        checked={showUnread}
                        onChange={handleSwitchChange}
                        inputProps={{ 'aria-label': 'Mostrar solo las no leídas' }}
                    />
                </Box>
                <Divider />
                <List>
                    {filteredNotifications.map((notification, index) => (
                        <CardNotification
                            key={index}
                            notification={notification}
                            handleClick={() => handleClick(notification)}
                        />
                    ))}
                </List>
            </Box>
        </ThemeProvider>
    );
}

function CardNotification({ notification}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("/admin/orders/");
    };

    return (
        <ListItem sx={{ alignItems: 'flex-start', cursor: 'pointer' }}>
            <Card sx={{ width: "100%" }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <ListItemAvatar>
                            <Avatar alt="logo" src={image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={notification.message}
                            secondary={`Hace ${notification.daysAgo || 0} días`}
                        />
                        {/* {notification.read 
                            ? <CheckCircleOutline color="action" />
                            : <RadioButtonUnchecked color="primary" />
                        } */}
                        <Typography 
                            variant="caption" 
                            color="primary" 
                            sx={{ marginTop: 1 }}
                        >
                            Color lucy
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}