
import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument, UserRequest } from "../models/user.model";



export async function createUser(input: UserRequest) {
    try{
        const result = await UserModel.create(input);
        return omit(result.toJSON(), "password");
    } catch(e: any) {
        throw e;
    }
}

export async function isUserExist(email: string){
    try {
        return await UserModel.exists({email});
    } catch (e: any) {
        throw e;
    }
}

export async function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
    try {
        const result = await UserModel.findOne(query,{},options);
 
        return result;
    } catch (e:any) {
        throw e;
    }
}

export async function validateUserPassword({email, password}: {email: string, password:string}) {
    const user = await UserModel.findOne({email}, {}, { lean: true });

    if(!user) return false;

    const isValid = user.comparePasswords(password);

    if(!isValid) return false;

    return omit(user.toJSON(), "password");
}