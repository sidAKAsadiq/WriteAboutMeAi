import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js";
import { api_error } from "../utils/api_error.js";
import { async_handler } from "../utils/async_handler.js";

const verify_jwt = async_handler(async(req,res,next) => {
    try {
        //getting token
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer" , "")
        if(!token){
            return res.status(500).json(new api_error(500 , "User doesnt have Token", "User doesnt have Token"))
        }

        //decoding token
        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded_token?.id).select("-refresh_token")

        if(!user){
            return res.status(500).json(new api_error(500 , "Cant find User based on decoded token id", "Cant find User based on decoded token id"))
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).json(new api_error(500 , "Error in verify jwt", "Error in verify jwt"))
    }
})

export {verify_jwt}