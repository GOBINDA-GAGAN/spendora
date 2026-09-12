import express from "express";
import { updateProfile } from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute=express.Router();

userRoute.patch('/me',authMiddleware,updateProfile)


export default userRoute;