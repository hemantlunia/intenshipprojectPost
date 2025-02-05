import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:String,
        required:true
    }
},{timestamps:true});

const Post = mongoose.model("Post",postSchema);
export default Post;