import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { object, string } from "zod";
import * as crypto from "crypto";
import e from "express";

const privateKey = String(process.env.privateKey);
export const SignJwt = async (payload: object) => {
  const finalPayload = {
    ...payload,
  };
  return await jwt.sign(finalPayload, privateKey, { expiresIn: "7d" });
};
interface Ipayload {
  userid: number;
  iat: number;
  exp: number;
}
export const VerifyJwt = async (token: string) => {
  try {
    const data: any = await jwt.verify(token, privateKey);

    return {
      Expired: false,
      userid: data.userid,
    };
  } catch (error) {
    console.log("Token Expired");
    return {
      Expired: true,
      Message: "Token is Expired",
    };
  }
};
