import  { useState } from "react";
import { TextField, Button, Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async() => {
    try {
      const res = await axios.post(`${url}/user/login`,formData,{withCredentials:true});
      const result = res.data;
      if (result.success) {
        localStorage.setItem("postToken",result.postToken);
        toast.success(result.message)
        navigate('/home')
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Box mt={2}>
          <Typography>
            Do not have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/")}
            >
              Signup
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
