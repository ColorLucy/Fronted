import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import Logo from "../../components/logo";
import HomeStartForm from "../../components/HomeStartForm";
import HomeCombinationsForm from "../../components/HomeCombinationsForm";
import HomeProductsForm from "../../components/HomeProductsForm";
import HomeAlliesForm from "../../components/HomeAlliesForm";
import HomeInfobarForm from "../../components/HomeInfobarForm";

const HomeEdit = () => {
  const [EditForm, setEditForm] = useState(() => <div></div>);
  const [isFormSelected, setIsFormSelected] = useState(false);
  const navigate = useNavigate();

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
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 2rem",
            }}
          >
            <Logo imgSize={40} minLen={true} />
            <Button
              id="return-button"
              color="lucy_pink"
              variant="contained"
              startIcon={<ReplyIcon />}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.lucy_red.main,
                },
              }}
              onClick={() => setIsFormSelected(false)}
            >
              Volver
            </Button>
          </Box>
          <EditForm />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 2rem",
            }}
          >
            <Logo imgSize={40} minLen={true} />
            <Button
              id="return-button"
              color="lucy_pink"
              variant="contained"
              startIcon={<ReplyIcon />}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.lucy_red.main,
                },
              }}
              onClick={() => navigate("/admin/")}
            >
              Volver
            </Button>
          </Box>
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
                color: "#0AA64D",
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
        </>
      )}
    </ThemeProvider>
  );
};

export default HomeEdit;
