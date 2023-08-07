import { Router, Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { VerifyJwt } from "../model/jwt";
import { any } from "zod";
import { Code, sendTemplate } from "../model/template";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) return;
  const [keyword, token] = authorization?.split(" ");
  if (keyword !== "Bearer") return;
  const tokenStatus = await VerifyJwt(token);
  if (tokenStatus.Expired)
    res.status(Code.s401_Unauthorized).send(sendTemplate(tokenStatus, false));
  else {
    res.locals.userid = tokenStatus.userid;
    next();
  }
};
