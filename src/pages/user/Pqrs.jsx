import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";

function Pqrs() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formsubmit.co/d51c79fb35d34bf937e3da538acba962", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAlert({
          open: true,
          severity: "success",
          message: "Correo enviado exitosamente!",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlert({
          open: true,
          severity: "error",
          message: "Hubo un error al enviar el correo. Inténtalo de nuevo.",
        });
      });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");

  useEffect(() => {
    const { nombre, apellido, correo, telefono, asunto, mensaje } = formData;
    const isValid =
      nombre.trim() !== "" &&
      apellido.trim() !== "" &&
      correo.trim() !== "" &&
      telefono.trim() !== "" &&
      asunto.trim() !== "" &&
      mensaje.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <Grid
      container
      display={"flex"}
      flexWrap={"nowrap"}
      spacing={1}
      alignContent={"flex-start"}
      padding={10}
      direction={isMobileOrTablet ? "column" : "row"}
    >
      <Grid item xs={6} sm={12} alignContent={"flex-start"}>
        <Typography variant="h4">
          <strong>PERMITENOS AYUDARTE</strong>
        </Typography>
        <Typography variant="body1">
          <br />
          En ColorLucy, tu satisfacción es nuestra prioridad.Si tienes alguna
          petición, queja, reclamo o sugerencia, no dudes en comunicarte con
          nosotros. Queremos escuchar tus comentarios y asegurarnos de brindarte
          la mejor experiencia posible. <br />
          <br />
          Por favor, completa el siguiente formulario con tus datos y detalles
          de tu solicitud. Nos comprometemos a responderte en el menor tiempo
          posible.
        </Typography>
        <Typography variant="body2">
          <em>
            <br />
            *Recuerda que todos los campos son obligatorios.
          </em>
        </Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Correo Electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número de teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            Enviar
          </Button>
          <input type="hidden" name="_catcha" value={false} />
        </form>
      </Grid>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Pqrs;
