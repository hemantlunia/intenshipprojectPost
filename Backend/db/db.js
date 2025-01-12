import mongoose from "mongoose";

import { configDotenv } from "dotenv";
configDotenv();


const DBconnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo Connect to..... ${connect.connection.host}`);
        
    } catch (error) {
        console.log("Error in MongoDb", error.message);
        process.exit(1);
        
    }
};

export default DBconnect;