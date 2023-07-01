import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import { User } from "../models/User.js";

export const isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        res.status(404).json({
            success:false,
            message:"unauthenticated"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.user = await User.findById(decoded._id);

    next();
    }