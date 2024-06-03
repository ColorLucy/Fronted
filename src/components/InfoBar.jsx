import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";
import { getInfoBarInfo } from "../utils/information";

export default function InfoBar() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getInfoBarInfo();
        setInfo(data[0]);
        // console.log("Data: ", data.title);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchInfo();
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          ".MuiGrid-root": { ml: 0 },
          backgroundColor: "#2C2E33",
          display: "flex",
          position: "static",
          minHeight: "100px",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 0",

          columnGap: "20px",
        }}
        justifyContent="center"
      >
        {/* TItulo */}
        <Grid item alignContent={"center"} color={"white"}>
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",

              fontStyle: "bold",
              maxWidth: "15rem",
              wordWrap: "break-word",
            }}
          >
            {info.title}
          </Typography>
        </Grid>
        {/* Información de contacto */}
        <Grid item alignContent={"center"} color={"white"}>
          {/* Teléfono 1 */}
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              fontStyle: "bold",
              maxWidth: "15rem",
              wordWrap: "break-word",
            }}
          >
            {info.phone_one}
          </Typography>
          {/* Teléfono 2 */}
          <Typography variant="body1" fontStyle={"bold"}>
            {info.phone_two}
          </Typography>
          {/* Dirección */}
          <Typography variant="body1" fontStyle={"bold"}>
            {info.address}
          </Typography>
        </Grid>
        {/* Redes sociales */}
        <Grid item alignContent={"center"} color={"white"}>
          <Button
            color="inherit"
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send/?phone=%2B573155176725&text=Hola,%20deseo%20asesor%C3%ADa&type=phone_number&app_absent=0",
                "_blank"
              );
            }}
          >
            <BsWhatsapp size="30px" color="inherit" />
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              window.open(
                "https://www.facebook.com/PinturasColorlucy",
                "_blank"
              );
            }}
          >
            <BsFacebook size="30px" color="inherit" />
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              window.open(
                "https://www.instagram.com/pinturas_colorlucy/",
                "_blank"
              );
            }}
          >
            <BsInstagram size="30px" color="inherit" />
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              window.open(
                "https://www.tiktok.com/@pinturascolor_lucy?lang=es",
                "_blank"
              );
            }}
          >
            <BsTiktok size="30px" color="inherit" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
