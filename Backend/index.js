import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/userRoute.js" 
import postRoute from "./routes/postRoute.js"
import MongoDB from "./db/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
configDotenv();

const app = express();
app.use(express.json());
app.use(cookieParser());

// DB Connection
MongoDB();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.get("/",(req,res)=>{
   return res.json({name:"Hemant"})
})

// user api******************************************************************
app.use("/api/user",userRoutes)

// post api******************************************************************
app.use("/api/post",postRoute)

app.listen(8080,()=>{
    console.log("Server Started");
    
});

