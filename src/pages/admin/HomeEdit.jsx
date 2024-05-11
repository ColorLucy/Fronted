import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import HomeStartForm from "../../components/HomeStartForm";
import HomeCombinationsForm from "../../components/HomeCombinationsForm";
import HomeProductsForm from "../../components/HomeProductsForm";
import HomeAlliesForm from "../../components/HomeAlliesForm";
import HomeInfobarForm from "../../components/HomeInfobarForm";

const HomeEdit = () => {
  const [EditForm, setEditForm] = useState(() => <div></div>);
  const [isFormSelected, setIsFormSelected] = useState(false);

  /**
   * Handles the form to render after selecting one
   * @param {Event} event
   * @param {React.JSX.Element} form
   */
  const handleForm = (event, form) => {
    event.preventDefault();
    setEditForm(() => form);
    setIsFormSelected(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        id="reload-button"
        color="lucy_red"
        variant="contained"
        sx={{ color: "white", margin: "16px 0 0 0", left: "85%" }}
        onClick={() => window.location.reload()}
      >
        Volver
      </Button>
      {isFormSelected ? (
        <EditForm />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem 0",
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              margin: "1rem 0 2rem 0",
            }}
          >
            Elija un Sección a Editar
          </Typography>
          <Button
            id="start-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeStartForm)}
          >
            Editar Sección de Inicio
          </Button>
          <Button
            id="combinations-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeCombinationsForm)}
          >
            Editar Sección de Combinaciones
          </Button>
          <Button
            id="products-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeProductsForm)}
          >
            Editar Sección de Productos
          </Button>
          <Button
            id="allies-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeAlliesForm)}
          >
            Editar Sección de Aliados
          </Button>
          <Button
            id="infobar-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeInfobarForm)}
          >
            Editar Sección de Contacto
          </Button>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default HomeEdit;
