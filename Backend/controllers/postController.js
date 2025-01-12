import authUserMiddleware from "../middlewares/middleware.js";
import Post from "../models/Post.model.js";
import User from "../models/User.model.js";

// post create *******************************************************
const createPost = async (req, res) => {
  const { title, description, token } = req.body;
  const userId = token;
  const decode = await authUserMiddleware(userId);

  // find user
  try {
    const user = await User.findById(decode.id);

    if (!user) {
      return res.json({
        message: "User not found to create Post!",
        success: false,
      });
    }

    const newPost = new Post({ title, description, user: user.email });
    await newPost.save();

    return res.json({
      message: "Post Created successfully",
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Error While creating Post",
      success: false,
    });
  }
};

// ********************************************update Post**********************
const updatePost = async (req, res) => {
  try {
    const { title, description,token } = req.body;
    const { id } = req.params;
    

    if (!token || !id || !title || !description) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const decode = await authUserMiddleware(token); 
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // Check owner of the post...
    if (user.email !== post.user) {
      return res.status(403).json({
        message: "You are not authorized to update this post", 
        success: false,
      });
    }

    post.title = title;
    post.description = description;
    await post.save();

    return res.status(200).json({
      message: "Post updated successfully!",
      success: true
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating post",
      success: false,
    });
  }
};

// Delete Post*******************************************************
const deletePost = async (req, res) => {
    try {
    const token = req.headers.authorization?.split(" ")[1];
      const { id } = req.params;
    //   console.log(token, id);
      
  
      if (!token || !id) {
        return res.status(400).json({
          message: "Missing required fields (token or post ID)",
          success: false,
        });
      }
  
      const decode = await authUserMiddleware(token); 
      const user = await User.findById(decode.id);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
          success: false,
        });
      }
  
      if (user.email !== post.user) {
        return res.status(403).json({
          message: "You are not authorized to delete this post",
          success: false,
        });
      }
  
      await post.deleteOne();
  
      return res.status(200).json({
        message: "Post deleted successfully!",
        success: true,
      });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Error while deleting post",
        success: false,
      });
    }
  };
  

//  ***************************************************************************
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json({
      message: "All Posts...",
      success: false,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { deletePost, updatePost, createPost, getAllPost };
