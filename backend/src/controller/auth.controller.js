import { findOneUser } from "../dao/auth.dao.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";




export async function createUserController(req, res){
    const {username, email, password} = req.body;
    const isUserExsit = await findOneUser({$or: [{username}, {email}]});
    if(isUserExsit){
        return res.status(400).json({
            message: "User already exists"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
        username, 
        email, 
        password: hashPassword});
    const token = jwt.sign({id: user._id}, config.JWT_SECRET)
    res.cookie("token", token)
    return res.status(201).json({
        message: "User created successfully", 
        user,
        token});
}

export async function loginUserController(req, res){
    const {username, email, password} = req.body;
    const users = await findOneUser({$or: [{username}, {email}]});
    if(!users){
        return res.status(400).json({
            message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, users.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"});
    }
    const token = jwt.sign({id: users._id}, config.JWT_SECRET)
    res.cookie("token", token)
    return res.status(201).json({
        message: "User logged in successfully", 
        users,
        token});
}