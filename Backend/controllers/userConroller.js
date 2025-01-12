import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email,password);
  

  //   validating
  if (!username || !email || !password) {
    return res.json({
      message: "All Fields required",
      success: false,
    });
  }
 try {
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.json({
         message: "User Already exist,Please Login",
         success: false,
       });
     }
   
     //   pass Hashing
     const salt = await bcrypt.genSalt(10);
     const hashPass = await bcrypt.hash(password, salt);
   
     const newUser = await User({
       username,
       email,
       password: hashPass,
     });
   
     await newUser.save();
   
     return res.json({
       message: "User Created Successfully",
       success: true,
     });
 } catch (error) {
    console.log(error.message);
    return res.json({
        message: "Error while creating User",
        success: false,
      });
 }
};



// ************************************************
// login
const  login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.json({
      message: "All Fields required",
      success: false,
    });
  }
try {
    
      const userCheckingIndatabase = await User.findOne({ email });
      if (!userCheckingIndatabase) {
        return res.json({
          message: "User does not exists",
          success: false,
        });
      }
    
      //   chek password now
      const MatchingPass = await bcrypt.compare(
        password,
        userCheckingIndatabase.password
      );
      if (!MatchingPass) {
        return res.json({
          message: "Incorrect password",
          success: false,
        });
      }
    
      //   generating Token
      const token = jwt.sign(
        { id: userCheckingIndatabase._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    
      res.cookie("postToken", token);
    
      return res.json({
        message: "Login Successfull",
        success: true,
        postToken:token
      });
} catch (error) {
    console.log(error.message);
    return res.json({
        message: "Try Again",
        success: false,
      });
}
};

// **********************************************************************
const logout = async(req,res)=>{
        res.cookie("postToken","",{expires: new Date(0)});
        return res.json({
          message: "Logout Successfull",
          success: true,
        });
};

export {login, signup, logout};
