import  { useState } from "react";
import { TextField, Button, Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast"

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const url = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async() => {
    try {
      const res = await axios.post(`${url}/user/signup`,formData,{withCredentials:true});
      const result = res.data;
      if (result.success) {
        toast.success(result.message)
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
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
        >
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
            Signup
          </Button>
          <Box mt={2}>
            <Typography>
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
