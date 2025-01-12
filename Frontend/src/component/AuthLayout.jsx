import { Outlet } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(()=>{
   const token = localStorage.getItem("postToken");
   if (token) {
    navigate("/home");
   } else{
    navigate("/");
   }
  },[])
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        minWidth:"100vh",
        marginLeft:"auto"
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            boxShadow: 3,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        ><Typography>Welcome, Please Fill the inputs To Enter Website</Typography>
          <Outlet /> 
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
