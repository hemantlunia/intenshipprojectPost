import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";
import Header from "./Header.jsx";
import toast from "react-hot-toast";

const CustomCard = styled(Card)(() => ({
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-5px)",
  },
}));

const Home = () => {
  const token = localStorage.getItem("postToken");
  const [posts, setPosts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    token,
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchAllPost = async () => {
    try {
      const res = await axios.post(`${API_URL}/post/getAllPost`, {
        Credential: true,
      });
      setPosts(res.data?.data || []);
    } catch (error) {
      console.error(error.message);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleDelete = async (id) => {
    console.log(formValues.token);

    try {
      const result = await axios.delete(
        `${API_URL}/post/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${formValues.token}`,
          },
        },
        { Credential: true }
      );

      if (result.data.success) {
        fetchAllPost();
        toast.success("Deleted ");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveEdit = async () => {
    const id = currentPost._id;
    try {
      if (id) {
        const result = await axios.post(
          `${API_URL}/post/update/${id}`,
          {
            title: formValues.title,
            description: formValues.description,
            token: token,
          },
          { Credential: true }
        );
        const res = result.data;
        if (res.success) {
          toast.success("Updated Successfully!");
          fetchAllPost();
          setOpenEditDialog(false);
        } else {
          toast.error(res.message);
          setOpenEditDialog(false);
        }
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleCreatePost = async () => {
    try {
      const res = await axios.post(`${API_URL}/post/createPost`, formValues, {
        Credential: true,
      });

      if (res.data.message) {
        toast.success(res.data.message);
        fetchAllPost();
        setOpenCreateDialog(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setFormValues({
      title: post.title,
      description: post.description,
    });
    setOpenEditDialog(true);
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Post
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
            <CustomCard>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 2, color: "text.secondary" }}
                >
                  {post.description}
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEditClick(post)}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>

      {posts.length === 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random()}>
          <CustomCard>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                No Post Available, Please Create A Post
              </Typography>
            </CardContent>
          </CustomCard>
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
