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
  getAlliesImages,
  updateAlliesImage,
  updateHomeText,
} from "../utils/information";

const validationSchema = yup.object({
  allies_text: yup.string("Ingresa el Texto de Productos").notRequired(),
});

const HomeAlliesForm = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [key, setKey] = useState(1);

  const [alliesImageIndex, setAlliesImageIndex] = useState(null);
  const [alliesImages, setAlliesImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [initialAlliesImageURL, setInitialAlliesImageURL] = useState([]);
  const [newAlliesImageURL, setNewAlliesImageURL] = useState([]);
  const [newImageFile, setNewImageFile] = useState([]);

  const initialValues = {
    allies_text: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Retorna solo los valores modificados
      const modifiedValues = getModifiedValues(values, initialValues);
      submitAlliesData(modifiedValues);
      resetForm();
    },
  });

  useEffect(() => {
    const fetchAlliesImages = async () => {
      const data = await getAlliesImages();
      if (data) {
        setAlliesImages(data);
        let initialImages = [];
        let newImages = [];
        let newImagesFile = [];
        for (const item of data) {
          // console.log("Item", item);
          initialImages.push(item.url);
          newImages.push(item.url);
          newImagesFile.push(null);
        }
        setInitialAlliesImageURL(initialImages);
        setNewAlliesImageURL(newImages);
        setNewImageFile(newImagesFile);
        // console.log(data);
      }
      setLoadingImages(false);
    };
    fetchAlliesImages();
  }, []);

  /**
   * Submits the update of Home Allies Info by sending a PATCH request to the server
   * @param {Object} values - An object with the values to edit
   */
  const submitAlliesData = async (values) => {
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

    for (let i = 0; i < initialAlliesImageURL.length; i++) {
      if (initialAlliesImageURL[i] !== newAlliesImageURL[i]) {
        const formData = new FormData();
        formData.append("allies_image", newImageFile[i]);
        await updateAlliesImage(i + 1, formData)
          .then(() => {
            URL.revokeObjectURL(alliesImages[i].url);
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
    setAlliesImageIndex(index);
  };

  /**
   * Manejo del Botón para cambiar imagenes de la Sección de Productos
   * @param {Event} event - Event
   * @param {Number} index - Image Index
   */
  const handleAlliesImageChange = (event, index) => {
    event.preventDefault();
    //console.log(index);
    // console.log(event.target.files);
    try {
      let newImageURL = URL.createObjectURL(event.target.files[0]);
      // console.log(alliesImages[index].url);
      alliesImages[index].url = newImageURL; // Image to show in the carousel
      newAlliesImageURL[index] = newImageURL;
      newImageFile[index] = event.target.files[0];
      // console.log("New URL: ", alliesImages[index].url);
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
    for (const image of alliesImages) {
      console.log(image);
    }
    console.log(initialAlliesImageURL);
    console.log(newAlliesImageURL);
    for (let i = 0; i < initialAlliesImageURL.length; i++) {
      console.log(
        `Imagen ${i + 1}`,
        initialAlliesImageURL[i] === newAlliesImageURL[i]
      );
    }
    console.log("Image Files", newImageFile);
    window.alert("Testeado con éxito");
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
              id="allies_text"
              name="allies_text"
              label="Texto de Aliados"
              color="lucy_blue"
              variant="outlined"
              value={formik.values.allies_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.allies_text && Boolean(formik.errors.allies_text)
              }
              helperText={
                formik.touched.allies_text && formik.errors.allies_text
              }
              placeholder="Texto de Aliados"
              sx={{ margin: "1rem 0" }}
            />
            {loadingImages ? (
              <CircularProgress />
            ) : alliesImages.length > 0 ? (
              <ImagesSlider
                key={key}
                autoPlay={autoPlay}
                onImageChange={(index) => handleImageChange(index)}
              >
                {alliesImages.map((image, index) => (
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
                      alt={`Image ${index}`}
                      style={{
                        maxWidth: "230px",
                        maxHeight: "300px",
                        objectFit: "cover",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <span>{`Image ${index + 1}`}</span>
                    <input
                      id="contained-allies-button-file"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleAlliesImageChange(event, alliesImageIndex)
                      }
                      style={{ display: "none" }}
                    />
                    <label
                      id="contained-allies-button-label"
                      htmlFor="contained-allies-button-file"
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

export default HomeAlliesForm;
