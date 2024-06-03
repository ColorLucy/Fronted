import React, { useEffect, useState } from 'react';
import { Box, Typography, Switch, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from '../../../public/logoTemp.webp';
import { theme } from "../../styles/theme";
import axiosInstance from '../../utils/axiosInstance';

export default function Notifications({ modifyTitle }) {
    const [notifications, setNotifications] = useState([]);
    const [showUnread, setShowUnread] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        modifyTitle("Notificaciones");

        axiosInstance.get(`/shopping/notifications/`)
            .then(response => {
                setNotifications(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            });
    }, []);

    const handleSwitchChange = () => {
        setShowUnread(!showUnread);
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
                {loading ? (
                    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                        <CircularProgress />
                        <Typography variant="body2" mt={2}>Cargando notificaciones...</Typography>
                    </Box>
                ) : (
                    <List>
                        {filteredNotifications.map((notification, index) => (
                            <CardNotification
                                key={index}
                                notification={notification}
                            />
                        ))}
                    </List>
                )}
            </Box>
        </ThemeProvider>
    );
}

function CardNotification({ notification }) {
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