import express from "express";
import {login,logout,signup} from "../controllers/userConroller.js";

const route = express.Router();



// user Routesss
route.post("/signup",signup);
route.post("/login",login);
route.post("/logout",logout);



export default route;