import userModel from "../models/user.model.js";



export async function createUser(data){
    const user = await userModel.create(data);
    return user;
}

export async function findOneUser(query){
    const user = await userModel.findOne(query);
    return user;
}

export async function findUser(query){
    const user = await userModel.find(query);
    return user;
}