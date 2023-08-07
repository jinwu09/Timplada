import { Router, Response, Request } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { Code, sendTemplate } from "../model/template";
const prisma = new PrismaClient();
const router: Router = Router();

// get all stuff
router.get("", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {
  const idParamScheme = z.number({ required_error: "id Param Required" });
  const valid = idParamScheme.safeParse(Number(req.params.id));
  if (!valid.success) return res.status(400).send(valid);
});
// post something
router.post("/", (req: Request, res: Response) => {});

// update something
router.put("/:id", (req: Request, res: Response) => {
  const bodySchema = z.object({}).array();
});
// delete specific record
router.delete("/:id", async (req: Request, res: Response) => {
  const paramSchema = z.number();
  const valid = paramSchema.safeParse(Number(req.params.id));
  if (!valid.success) return res.status(Code.S400_Bad_Request).send(valid);

  const userid = res.locals.userid;
});

export const TemplateRouter: Router = router;
