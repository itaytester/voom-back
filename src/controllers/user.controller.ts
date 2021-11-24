import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, isUserExist } from "../services/user.service";
import { signJWT, signRefreshJWT } from "../utils/jwt.utils";
import log from "../utils/logger";

export async function getUserRegisterHandler(req: Request, res: Response) {
  try {
    const userExists = await isUserExist(req.body.email);

    if (userExists)
      res.status(409).send(`User with email ${req.body.email} already exists.`);

    const result = await createUser(req.body);

    const accessToken = signJWT({ ...result }, { expiresIn: "30s" });

    res.cookie("accessToken", accessToken);

    const refreshToken = await signRefreshJWT({ ...result });

    res.cookie("refreshToken", refreshToken);

    res.send({accessToken, refreshToken});
  } catch (e: any) {
    log.error(e);
    res.status(409).send(e.message);
  }
}
