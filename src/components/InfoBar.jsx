import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Box, Container } from "@mui/material";
import { BsTiktok, BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
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
          minHeight: "7rem",
          bottom: 0,
          left: 0,
          right: 0,
          marginTop: "1rem",
          padding: "1rem 0",
        }}
        justifyContent="center"
      >
        {/* TItulo */}
        <Grid item alignContent={"center"} color={"white"}>
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              marginRight: "4rem",
              fontStyle: "bold",
              maxWidth: "15rem",
              wordWrap: "break-word",
            }}
          >
            {info.title}
          </Typography>
        </Grid>
        {/* Información de contacto */}
        <Grid item alignContent={"center"} marginRight={3} color={"white"}>
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
                "https://api.whatsapp.com/send/?phone=%2B573155176725&text&type=phone_number&app_absent=0",
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
