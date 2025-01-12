import jwt from "jsonwebtoken";

const authUserMiddleware = async(id)=>{
    const token = id;
    

    if (!token) {
        return res.json({
            message: "You Are Not Authorized",
            success:false,
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode) {
            return tokenDecode;
        } else{
            return false;
        }
    } catch (error) {
        console.log(error);
       return false;
        
    }

}

export default authUserMiddleware