import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { BarColors } from "../../components/NavigationBar";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //cerrar sesión
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    navigate("/signIn");
  };

  return (
    <div className="userProfilePage" style={{ height: "calc(100vh - 80px)" }}>
      <div className="cardUserProfile">
        
        <h2 style={{ color: "black", margin: "0" }}>Perfil de Usuario</h2>
       <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleLogout}
            style={{ width: "37ch", margin: "15px" }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
