import { Router, Response, Request, NextFunction } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../model/template";
import bcrypt from "bcrypt";
export const router: Router = Router();
import { SignJwt } from "../model/jwt";
import { Auth } from "../middleware/auth";
const prisma = new PrismaClient();

const saltRounds = 10;

router.get("", Auth, async (req: Request, res: Response) => {
  await prisma.accounts
    .findUnique({
      where: {
        id: res.locals.userid,
      },
      select: {
        username: true,
      },
    })
    .then((data) => {
      res.send(sendTemplate({ account: data }, true));
    })
    .catch((e) => {
      console.log("error in get account");
      res.status(400).send(sendTemplate({ message: "error " }, false));
    });
});
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const loginSchema = z.object({
      username: z.string({ required_error: "username is required" }),
      password: z.string({ required_error: "password is required" }),
    });
    const valid = loginSchema.safeParse(req.body);
    if (!valid.success) res.status(400).send(valid);

    type Ilogin = z.infer<typeof loginSchema>;
    const body: Ilogin = req.body;
    const isValidLogin = await prisma.accounts
      .findFirst({
        where: {
          username: body.username,
        },
        select: {
          id: true,
          username: true,
          password: true,
        },
      })
      .then(async (data) => {
        const hashpassword: any = data?.password;
        const test = await bcrypt
          .compare(body.password, hashpassword)
          .then((data) => {
            console.log(data);
            if (!data)
              return res
                .status(400)
                .send(
                  sendTemplate(
                    { message: "wrong password or account doesn't exist" },
                    false
                  )
                );
          })
          .catch((e) => {
            return res
              .status(400)
              .send(
                sendTemplate(
                  { message: "wrong password or account doesn't exist" },
                  false
                )
              );
          });
        const payload = {
          userid: data?.id,
        };
        const jwt = await SignJwt(payload);
        res.send(sendTemplate({ jwt }, true));
      })
      .catch((e) => console.log(e))
      .finally(() => prisma.$disconnect);
  }
);

router.post("/register", async (req: Request, res: Response) => {
  const loginSchema = z.object({
    username: z.string({ required_error: "username is required" }),
    password: z.string({ required_error: "password is required" }),
  });
  const error = loginSchema.safeParse(req.body);
  if (!error.success) res.status(400).send(error);

  type Ilogin = z.infer<typeof loginSchema>;
  const body: Ilogin = req.body;
  const hashpassowrd = await bcrypt.hash(body.password, saltRounds);
  const register = await prisma.accounts
    .create({
      data: {
        username: body.username,
        password: hashpassowrd,
        AccountsDetails: {
          create: {},
        },
      },
    })
    .then((datas) => {
      const data = {
        message: "success",
      };
      res.send(sendTemplate(data, true));
    })
    .catch((e) => {
      console.log(e);
      const data = {
        message: "account already exist",
      };
      res.status(Code.s406_Not_Acceptable).send(sendTemplate(data, false));
    });
});
export const AccountRouter: Router = router;
