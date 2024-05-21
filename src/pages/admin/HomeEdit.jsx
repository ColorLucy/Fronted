import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeAlliesForm from "../../components/HomeAlliesForm";
import HomeCombinationsForm from "../../components/HomeCombinationsForm";
import HomeInfobarForm from "../../components/HomeInfobarForm";
import HomeProductsForm from "../../components/HomeProductsForm";
import HomeStartForm from "../../components/HomeStartForm";
import { theme } from "../../styles/theme";

const HomeEdit = ({ modifyTitle }) => {
  const [EditForm, setEditForm] = useState(null);


  const queryParams = new URLSearchParams(location.search);
  const editPage = decodeURIComponent(queryParams.get("edit-page"));

  const editSections = {
    "Sección de Inicio": HomeStartForm, "Sección de Combinaciones": HomeCombinationsForm,
    "Sección de Productos": HomeProductsForm, "Sección de Aliados": HomeAlliesForm, "Sección de Contacto": HomeInfobarForm
  }
  useEffect(() => { editPage && !setEditForm(() => editSections[editPage]) && modifyTitle(editPage) }, [editPage])

  //;
  /**
   * Handles the form to render after selecting one
   * @param {Event} event
   * @param {React.JSX.Element} form
   */

  return (
    <ThemeProvider theme={theme}>
      {EditForm && <EditForm />}
    </ThemeProvider>
  );
};

export default HomeEdit;
