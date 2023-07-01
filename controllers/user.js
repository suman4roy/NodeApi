import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import { sendCookie } from "../utils/features.js";
export const getAllusers =  async(req,res)=>{}

export const register = async(req, res, next)=>{
        try {
            const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        return res.status(404).json({
            success:false,
            message:"User Already exist",
        });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({name, email, password:hashedPassword});

    sendCookie(user,res,"Registered Successfully", 201); 
        } catch (error) {
            next(error);
        }
}

export const login = async(req, res, next)=>{
   try {
     const {email, password} = req.body;
     let user = await User.findOne({email}).select("+password");
 
     if(!user){
         return res.status(404).json({
             success:false,
             message:"Invalid email or password",
         });
     }
     const isMatch = await bcrypt.compare(password, user.password);
 
     
     if(!isMatch){
         return res.status(404).json({
             success:false,
             message:"Invalid email or password",
         });
     }
 
     sendCookie(user,res,`Welcome back, ${user.name}`, 200); 
   } catch (error) {
    next(error);
   } 
}

export const getMyprofile = (req, res, next)=>{
        try {
            return res.status(200).json({
                success:true,
                user:req.user,
            });
        } catch (error) {
            next(error);
        }
}

export const logout = (req, res, next)=>{
       try {
         return res.status(200).cookie("token", "",{
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true,
        }).json({
             success:true,
             user:req.user,
         });
       } catch (error) {
            next(error);
       }
}