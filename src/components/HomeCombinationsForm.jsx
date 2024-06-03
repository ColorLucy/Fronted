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
  getCombinationsImages,
  updateCombinationsImage,
  updateHomeText,
} from "../utils/information";

const validationSchema = yup.object({
  combinations_title: yup
    .string("Ingresa el Título de Combinaciones")
    .notRequired(),
  combinations_text: yup
    .string("Ingresa el Texto de Combinaciones")
    .notRequired(),
});

const HomeCombinationsForm = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [key, setKey] = useState(1);

  const [combinationsImageIndex, setCombinationsImageIndex] = useState(null);
  const [combinationsImages, setCombinationsImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [initialCombinationsImageURL, setInitialCombinationsImageURL] =
    useState([]);
  const [newCombinationsImageURL, setNewCombinationsImageURL] = useState([]);
  const [newImageFile, setNewImageFile] = useState([]);

  const initialValues = {
    combinations_title: "",
    combinations_text: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Retorna solo los valores modificados
      const modifiedValues = getModifiedValues(values, initialValues);
      submitCombinationsData(modifiedValues);
      resetForm();
    },
  });

  useEffect(() => {
    const fetchCombinationsImages = async () => {
      const data = await getCombinationsImages();
      if (data) {
        setCombinationsImages(data);
        let initialImages = [];
        let newImages = [];
        let newImagesFile = [];
        for (const item of data) {
          // console.log("Item", item);
          initialImages.push(item.url);
          newImages.push(item.url);
          newImagesFile.push(null);
        }
        setInitialCombinationsImageURL(initialImages);
        setNewCombinationsImageURL(newImages);
        setNewImageFile(newImagesFile);
        // console.log(data);
      }
      setLoadingImages(false);
    };
    fetchCombinationsImages();
  }, []);

  /**
   * Submits the update of Home Combinations Info by sending a PATCH request to the server
   * @param {Object} values - An object with the values to edit
   */
  const submitCombinationsData = async (values) => {
    const data = JSON.stringify({ ...values }, null, 2);

    if (Object.keys(values).length) {
      await updateHomeText(1, values)
        .then(() => {
          console.log("Información actualizada exitosamente: ", data);
          window.alert(
            `La información ha sido actualizada correctamente: ${data}`
          );
        })
        .catch((error) => {
          console.error(
            "Ocurrió un error al actualizar la información: ",
            error
          );
          window.alert(
            "La actualización de la información ha fallado, vuelva a intentarlo"
          );
        });
    } else {
      window.alert("No se modificó ningún campo");
    }

    for (let i = 0; i < initialCombinationsImageURL.length; i++) {
      if (initialCombinationsImageURL[i] !== newCombinationsImageURL[i]) {
        const formData = new FormData();
        formData.append("combinations_image", newImageFile[i]);
        await updateCombinationsImage(i + 1, formData)
          .then(() => {
            URL.revokeObjectURL(combinationsImages[i].url);
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
    setCombinationsImageIndex(index);
  };

  /**
   * Manejo del Botón para cambiar imagenes de la Sección de Combinaciones
   * @param {Event} event - Event
   * @param {Number} index - Image Index
   */
  const handleCombinationsImageChange = (event, index) => {
    event.preventDefault();
    //console.log(index);
    // console.log(event.target.files);
    try {
      let newImageURL = URL.createObjectURL(event.target.files[0]);
      // console.log(combinationsImages[index].url);
      combinationsImages[index].url = newImageURL; // Image to show in the carousel
      newCombinationsImageURL[index] = newImageURL;
      newImageFile[index] = event.target.files[0];
      // console.log("New URL: ", combinationsImages[index].url);
    } catch (error) {
      console.error("No se seleccionó ninguna imagen", error);
    }
    setKey(Math.random());
  };

  /**
   * Handles test, this function is for testing only
   * @param {Event} event - the event from the form or button click that triggers the function
   */
  const handleTest = async (event) => {
    event.preventDefault();
    for (const image of combinationsImages) {
      console.log(image);
    }
    console.log(initialCombinationsImageURL);
    console.log(newCombinationsImageURL);
    for (let i = 0; i < initialCombinationsImageURL.length; i++) {
      console.log(
        `Imagen ${i + 1}`,
        initialCombinationsImageURL[i] === newCombinationsImageURL[i]
      );
    }
    console.log("Image Files", newImageFile);
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
        <Grid container spacing={2} alignItems="start" justifyContent="center">
          <Grid
            container
            direction="column"
            className="combinations-grid"
            item
            xs={2.8}
            alignItems="center"
            justifyContent="center"
          >

            <TextField
              id="combinations_title"
              name="combinations_title"
              label="Title"
              color="lucy_yellow"
              variant="outlined"
              value={formik.values.combinations_title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.combinations_title &&
                Boolean(formik.errors.combinations_title)
              }
              helperText={
                formik.touched.combinations_title &&
                formik.errors.combinations_title
              }
              placeholder="Title"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              id="combinations_text"
              name="combinations_text"
              label="Texto de Combinaciones"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.combinations_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.combinations_text &&
                Boolean(formik.errors.combinations_text)
              }
              helperText={
                formik.touched.combinations_text &&
                formik.errors.combinations_text
              }
              placeholder="Texto de Combinaciones"
              sx={{ margin: "1rem 0" }}
            />
            {loadingImages ? (
              <CircularProgress />
            ) : combinationsImages.length > 0 ? (
              <ImagesSlider
                key={key}
                autoPlay={autoPlay}
                onImageChange={(index) => handleImageChange(index)}
              >
                {combinationsImages.map((image, index) => (
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
                      id="contained-comb-button-file"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleCombinationsImageChange(
                          event,
                          combinationsImageIndex
                        )
                      }
                      style={{ display: "none" }}
                    />
                    <label
                      id="contained-comb-button-label"
                      htmlFor="contained-comb-button-file"
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
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HomeCombinationsForm;
