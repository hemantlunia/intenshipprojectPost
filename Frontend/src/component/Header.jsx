import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const logout = async()=>{
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{},{withCredentials:true});
    const result = res.data;
    if (result.success) {
      toast.success("Successfully Logout")
      localStorage.setItem("postToken","")
      navigate("/")
    }
  }
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Simple Post web 
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={logout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
