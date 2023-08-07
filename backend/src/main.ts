import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Code, sendTemplate } from "./model/template";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { apiRouter } from "./routes/api";
dotenv.config({ path: resolve(__dirname, "..") + "/.env" });

export const app: Express = express();
const port = process.env.TIMPLADA_PORT;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = "*";

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req: Request, res: Response) => {
  res
    .status(Code.S400_Bad_Request)
    .send(sendTemplate({ msg: "Route doesn't exist" }, false));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
