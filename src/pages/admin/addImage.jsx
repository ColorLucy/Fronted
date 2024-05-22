import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const AddImage = ({ imageUploadedClou,  onClose}) => {
    const [file, setFile] = useState();
    const [fileSelected, setFileSelected] = useState(false);

    const handleSubmitImage = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', import.meta.env.VITE_CLOUDINARY_FOLDER);
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_KEY);

        try {
            const response = await fetch(
                import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const data = await response.json();
            const imgUrl = data.url;
            imageUploadedClou(imgUrl);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
        onClose();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileSelected(true);
    }

    const handleBack = (e) => {
        onClose();
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
        >
            <Grid item>
                <input type="file" onChange={handleFileChange}/>
            </Grid>
            <Grid item justifyContent={"space-around"}>
                {fileSelected && (
                    <Button
                        variant="text"
                        color="inherit"
                        size="medium"
                        endIcon={<IosShareIcon />}
                        onClick={handleSubmitImage}
                    >
                        Subir
                    </Button>
                )}
                <Button
                    variant="text"
                    color="inherit"
                    size="medium"
                    endIcon={<CloseSharpIcon />}
                    onClick={handleBack}
                >
                    Cerrar
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddImage;