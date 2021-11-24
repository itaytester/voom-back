import { NextFunction, Response, Request } from "express";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJWT } from "../utils/jwt.utils";



export default async function authorization(req: Request, res: Response, next: NextFunction) {

    const accessToken = req.headers["authorization"]?.split(" ")[1];
    
    const refreshToken = req.headers["x-refresh"];

    if(!accessToken) return next();

    const {decoded, expired} = verifyJWT(accessToken);

    if(decoded) {
        res.locals.user = decoded;
        return next();
    }

    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken as string);

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const {decoded} = verifyJWT(newAccessToken as string);

        res.locals.user = decoded;
        return next();
    }

    return next();

}