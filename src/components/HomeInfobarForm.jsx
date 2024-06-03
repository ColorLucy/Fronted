import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { theme } from "../styles/theme";
import { getModifiedValues } from "../utils/formModifiedValues";
import { updateInfobar } from "../utils/information";

const validationSchema = yup.object({
  title: yup.string("Ingresa el Título de Contacto").notRequired(),
  phone_one: yup.string("Ingresa el Teléfono #1 de Contacto").notRequired(),
  phone_two: yup.string("Ingresa el Teléfono #2 de Contacto").notRequired(),
  address: yup.string("Ingresa la Dirección de Contacto").notRequired(),
});

const HomeInfobarForm = () => {
  const initialValues = {
    title: "",
    phone_one: "",
    phone_two: "",
    address: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Retorna solo los valores modificados
      const modifiedValues = getModifiedValues(values, initialValues);
      submitInfobarData(modifiedValues);
      resetForm();
    },
  });

  /**
   * Submits the update of Home Allies Info by sending a PATCH request to the server
   * @param {Object} values - An object with the values to edit
   */
  const submitInfobarData = async (values) => {
    const data = JSON.stringify({ ...values }, null, 2);

    if (Object.keys(values).length) {
      await updateInfobar(1, values)
        .then(() => {
          console.log("Información actualizada exitosamente: ", data);
          window.alert(
            `La información ha sido actualizada correctamente: ${data}`
          );
        })
        .catch((error) => {
          console.log("Ocurrió un error al actualizar la información: ", error);
          window.alert(
            "La actualización de la información ha fallado, vuelva a intentarlo"
          );
        });
    } else {
      window.alert("No se modificó ningún campo");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ paddingBottom: "2rem" }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2} alignItems="start" justifyContent="center">
          <Grid
            container
            direction="column"
            className="allies-grid"
            item
            xs={2.8}
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              id="title"
              name="title"
              label="Título de Contacto"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              placeholder="Título de Contacto"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              id="phone_one"
              name="phone_one"
              label="Teléfono #1"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.phone_one}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phone_one && Boolean(formik.errors.phone_one)
              }
              helperText={formik.touched.phone_one && formik.errors.phone_one}
              placeholder="Teléfono #1"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              id="phone_two"
              name="phone_two"
              label="Teléfono #2"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.phone_two}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phone_two && Boolean(formik.errors.phone_two)
              }
              helperText={formik.touched.phone_two && formik.errors.phone_two}
              placeholder="Teléfono #2"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              id="address"
              name="address"
              label="Dirección"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              placeholder="Dirección"
              sx={{ margin: "1rem 0" }}
            />
            <Button
              id="save-changes-button"
              color="lucy_blue"
              variant="contained"
              type="submit"
              sx={{ color: "white", marginTop: "1rem" }}
              startIcon={<SaveIcon />}
            >
              Guardar Cambios
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HomeInfobarForm;
