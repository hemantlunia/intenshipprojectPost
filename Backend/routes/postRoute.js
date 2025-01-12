import express from "express"
import {createPost, deletePost, updatePost, getAllPost} from "../controllers/postController.js"

const route = express.Router();


route.post("/createPost", createPost);
route.post("/update/:id", updatePost);
route.delete("/delete/:id", deletePost);
route.post("/getAllPost", getAllPost);


export default route;