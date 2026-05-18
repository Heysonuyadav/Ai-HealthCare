import { createUser, findOneUser } from "../dao/auth.dao.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authenticateToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        const user = await findOneUser({ _id: payload.id });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

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
    const token = jwt.sign({id: user._id}, config.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
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
    const token = jwt.sign({id: users._id}, config.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    return res.status(201).json({
        message: "User logged in successfully", 
        users,
        token});
}

export async function getCurrentUserController(req, res) {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
        message: "Current user fetched successfully",
        user: {
            username: user.username,
            email: user.email,
        }
    });
}

export async function logoutController(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
}
