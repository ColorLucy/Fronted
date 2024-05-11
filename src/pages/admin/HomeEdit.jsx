import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import HomeStartForm from "../../components/HomeStartForm";
import HomeCombinationsForm from "../../components/HomeCombinationsForm";
import HomeProductsForm from "../../components/HomeProductsForm";
import HomeAlliesForm from "../../components/HomeAlliesForm";

const HomeEdit = () => {
  const [EditForm, setEditForm] = useState(() => <></>);
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
            }}
          >
            Elija un Sección a Editar
          </Typography>
          <Button
            id="start-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "5rem 0 1rem 0" }}
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
            id="products-form-button"
            color="lucy_blue"
            variant="contained"
            sx={{ color: "white", margin: "1rem 0" }}
            onClick={(event) => handleForm(event, HomeAlliesForm)}
          >
            Editar Sección de Aliados
          </Button>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default HomeEdit;
