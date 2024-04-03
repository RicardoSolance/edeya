import { Express } from "express";
import { index } from "../controller/sampler";
import PathGenerator from "./pathCreator";
import { registerUser, getUsers } from "../controller/users";

const path = new PathGenerator("", false);

export default function routing(app: Express): void {
  app.get("/", index);

  app.post(path.auth.register(), registerUser);
  app.get(path.user.getUsers(), getUsers);
}
