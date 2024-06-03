import { Typography } from "@mui/material";
import React from "react";

export const Item = ({ children }) => (
  <Typography color="gray" align="left">
    {children}
  </Typography>
);

export const Item2 = ({ children }) => (
  <Typography align="left">{children}</Typography>
);

export const ItemTittle = ({ children }) => (
  <Typography fontWeight="bold" variant="inherit" color="green" gutterBottom>
    {children}
  </Typography>
);

export const ItemTittle2 = ({ children }) => (
  <Typography fontWeight="bold" align="left" gutterBottom>
    {children}
  </Typography>
);

export const ItemDynamic = ({ children, state }) => {
  let color = "purple";
  if (state === "Completado") {
    color = "green";
  } else if (state === "Cancelado") {
    color = "red";
  }
  return (
    <Typography variant="inherit" align="center" sx={{ color }}>
      {children}
    </Typography>
  );
};
