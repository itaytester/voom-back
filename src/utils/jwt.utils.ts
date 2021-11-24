import jwt from "jsonwebtoken";
import { set } from "../db/redis-client";
import config from "config"
import _ from "lodash";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJWT(payload:Object, options: jwt.SignOptions | undefined) {
    return jwt.sign(payload, privateKey, {...(options && options), algorithm: "RS256"});
}

export async function signRefreshJWT(payload:Object, options?: jwt.SignOptions | undefined) {
    const token = jwt.sign(payload, privateKey, {...(options && options), algorithm: "RS256"});
    const id = _.get(payload, "_id").toString();

    //TODO: add a TTL for the refresh token

    await set(id, token);
    return token;
}

export function verifyJWT(token:string) {
    try {
        const decoded = jwt.verify(token, publicKey, )
        return {
            valid: true,
            expired: false,
            decoded
        }
    }catch(e:any){
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}