import PhotoIcon from "@mui/icons-material/Photo";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import ImagesSlider from "../pages/admin/ImagesSlider";
import { theme } from "../styles/theme";
import { getModifiedValues } from "../utils/formModifiedValues";
import {
  getStartImages,
  updateHomeText,
  updateStartImage,
} from "../utils/information";

const validationSchema = yup.object({
  start_title: yup.string("Ingresa el Título de Inicio").notRequired(),
  start_text_one: yup.string("Ingresa el Texto #1 de Inicio").notRequired(),
  start_text_two: yup.string("Ingresa el Texto #2 de Inicio").notRequired(),
});

/**
 * Returns the Form to edit Start section of Home
 * @returns {React.JSX.Element}
 */
const HomeStartForm = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [key, setKey] = useState(1);

  const [startImageIndex, setStartImageIndex] = useState(null);
  const [startImages, setStartImages] = useState([]);
  const [loadingStartImages, setLoadingStartImages] = useState(true);
  const [initialStartImageURL, setInitialStartImageURL] = useState([]);
  const [newStartImageURL, setNewStartImageURL] = useState([]);
  const [newImageFile, setNewImageFile] = useState([]);

  const initialValues = {
    start_title:"",
    start_text_one: "",
    start_text_two: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Retorna solo los valores modificados
      const modifiedValues = getModifiedValues(values, initialValues);
      submitStartData(modifiedValues);
      resetForm();
    },
  });

  useEffect(() => {
    const fetchStartImages = async () => {
      const data = await getStartImages();
      if (data) {
        setStartImages(data);
        let initialImages = [];
        let newImages = [];
        let newImagesFile = [];
        for (const item of data) {

          initialImages.push(item.url);
          newImages.push(item.url);
          newImagesFile.push(null);
        }
        setInitialStartImageURL(initialImages);
        setNewStartImageURL(newImages);
        setNewImageFile(newImagesFile);
      }
      setLoadingStartImages(false);
    };
    fetchStartImages();
  }, []);

  /**
   * Submits the update of Home Info by sending a PATCH request to the server
   * @param {Object} values - An object with the values to edit
   */
  const submitStartData = async (values) => {

    const data = JSON.stringify({ ...values }, null, 2);

    if (Object.keys(values).length) {
      await updateHomeText(1, values)
        .then(() => {
          window.alert(
            `La información ha sido actualizada correctamente: ${data}`
          );
        })
        .catch((error) => {
          window.alert(
            "La actualización de la información ha fallado, vuelva a intentarlo"
          );
        });
    } else {
      window.alert("No se modificó ningún campo");
    }

    for (let i = 0; i < initialStartImageURL.length; i++) {
      if (initialStartImageURL[i] !== newStartImageURL[i]) {
        const formData = new FormData();
        formData.append("start_image", newImageFile[i]);
        await updateStartImage(i + 1, formData)
          .then(() => {
            URL.revokeObjectURL(startImages[i].url);
            window.alert(
              `La imagen ${i + 1} ha sido actualizada correctamente`
            );
          })
          .catch((error) => {
            console.error(
              "Ocurrió un error al actualizar la información: ",
              error
            );
            window.alert(
              `La actualización de la imagen ${i + 1
              } ha fallado, vuelva a intentarlo`
            );
          });
      }
    }
  };

  const handleImageChange = (index) => {
    setStartImageIndex(index + 1);
  };

  /**
   * Manejo del Botón para cambiar imagenes de la Sección de Inicio
   * @param {Event} event - Event
   * @param {Number} index - Image Index
   */
  const handleStartImageChange = (event, index) => {
    event.preventDefault();
    try {
      let newImageURL = URL.createObjectURL(event.target.files[0]);
      startImages[index].url = newImageURL; // Image to show in the carousel
      newStartImageURL[index] = newImageURL;
      newImageFile[index] = event.target.files[0];
    } catch (error) {
      console.error("No se seleccionó ninguna imagen", error);
    }
    setKey(Math.random());
  };

  /**
   * Handles the update of an existing product by sending a PUT request to the server
   * @param {Event} event - the event from the form or button click that triggers the function
   */
  const handleTest = async (event) => {
    event.preventDefault();
    window.alert("Testeado con éxito");
    // window.location.reload();
    /*updateDataRequest();
    const response = await updateProduct(id_product, requestData)
    if(response){
      alert("El producto ha sido actualizado correctamente");
    } else {
      alert("La actualización del producto ha fallado, vuelve a intentarlo")
    }*/
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ paddingBottom: "2rem" }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid container alignItems="start" justifyContent="center" flexDirection={"column"} sx={{alignItems: "center", maxWidth: "500px !important", margin: "auto"}} gap={"1rem"} >
          <TextField
            id="start_title"
            name="start_title"
            label="Title"
            color="lucy_yellow"
            variant="outlined"
            value={formik.values.start_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.start_title && Boolean(formik.errors.start_title)
            }
            helperText={
              formik.touched.start_title && formik.errors.start_title
            }
            placeholder="Title"
            fullWidth
            sx={{ maxWidth:"500px"}}
          />
          <TextField
            id="start_text_one"
            name="start_text_one"
            label="Texto #1"
            color="lucy_blue"
            variant="outlined"
            value={formik.values.start_text_one}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.start_text_one &&
              Boolean(formik.errors.start_text_one)
            }
            helperText={
              formik.touched.start_text_one && formik.errors.start_text_one
            }
            placeholder="Texto #1"
            fullWidth
            sx={{ maxWidth:"500px"}}
          />
          <TextField
            id="start_text_two"
            name="start_text_two"
            label="Texto #2"
            color="lucy_pink"
            variant="outlined"
            value={formik.values.start_text_two}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.start_text_two &&
              Boolean(formik.errors.start_text_two)
            }
            helperText={
              formik.touched.start_text_two && formik.errors.start_text_two
            }
            placeholder="Texto #2"
            fullWidth
            sx={{ maxWidth:"500px"}}
          />
          {loadingStartImages ? (
            <CircularProgress />
          ) : startImages.length > 0 ? (
            <ImagesSlider
              key={key}
              autoPlay={autoPlay}
              onImageChange={(event, index) =>
                handleImageChange(event, index)
              }
            >
              {startImages.map((image, index) => (
                <Grid
                  key={index}
                  container
                  direction="column"
                  item
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    key={index}
                    src={image.url}
                    alt={`Imagen ${index}`}
                    style={{
                      maxWidth: "230px",
                      maxHeight: "300px",
                      objectFit: "cover",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                  <span>{`Imagen ${index + 1}`}</span>
                  <input
                    id="contained-start-button-file"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleStartImageChange(event, startImageIndex)
                    }
                    style={{ display: "none" }}
                  />
                  <label
                    id="contained-start-button-label"
                    htmlFor="contained-start-button-file"
                  >
                    <Button
                      color="lucy_green"
                      variant="contained"
                      component="span"
                      startIcon={<PhotoIcon />}
                      sx={{
                        color: "white",
                        width: "fit-content",
                        marginTop: "1rem",
                      }}
                    >
                      Cambiar Foto
                    </Button>
                  </label>
                </Grid>
              ))}
            </ImagesSlider>
          ) : (
            <div
              style={{
                width: "fit-content",
                height: "100%",
                border: "1px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 0.86rem",
              }}
            >
              <div>No hay imágenes para mostrar</div>
            </div>
          )}
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
          <Button
            id="test-button"
            sx={{ color: "white", marginTop: "1rem", display: "none" }}
            color="lucy_pink"
            variant="contained"
            onClick={(event) => handleTest(event)}
          >
            Prueba
          </Button>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HomeStartForm;
