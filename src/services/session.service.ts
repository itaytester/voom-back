import {get, set} from "../db/redis-client";
import { userJwtPayload } from "../models/user.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function reIssueAccessToken(refreshToken: string) {
    const { decoded } = verifyJWT(refreshToken);

    if(!decoded) return false;

    const userId = (decoded as userJwtPayload)._id;

    const refresh = await get(userId);

    if(!refresh) return false;
    
    const user = await findUser({_id: userId});
    
    if(!user) return false;

    const newAccessToken = signJWT({...user}, {expiresIn: "15m"});

    return newAccessToken;
}