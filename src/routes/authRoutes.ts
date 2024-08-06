import { Express } from "express";
import PathGenerator from "./pathCreator";
import { login, session } from "../controller/Auth";

const path = new PathGenerator("", false);

export default function routing(app: Express): void {
  app.post(path.auth.login(), login);
  app.post(path.corporative.login(), session);
}
