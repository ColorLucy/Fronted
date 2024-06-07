import React from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { Button, Grid,Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OrderComponent from "../../components/ClientOrdersHistory";


const DetallePedido = () => {
    const location = useLocation();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const client = JSON.parse(localStorage.getItem('user'));

    const order = location.state?.order;

    if (!order) {
        return <div> Order not foound </div>
    }

    return (
        <div display="flex">
          <Grid container spacing={0}>
            <Grid item xs={12} >
              <Typography align="center" justify="center" paddingTop={10}>
                <Button
                  variant="text"
                  color="success"
                  startIcon={<ArrowBackIcon />}
                  onClick={(e) => navigate('/profile/mis-pedidos')}
                >
                  Pedidos
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OrderComponent
                instance={order}
                client={client}
              />
            </Grid>
          </Grid>
        </div>
    )
}

export default DetallePedido;