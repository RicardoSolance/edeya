import { Express } from "express";
import { index } from "../controller/sampler";
import PathGenerator from "./pathCreator";
import { getUsers } from "../controller/Users";
import { registerUser, login } from "../controller/Auth";

const path = new PathGenerator("", false);

export const routing = (app: Express): void => {
  app.get("/", index);

  // RUTAS DE AUTENTICACIÓN
  app.post(path.auth.register(), registerUser);
  app.post(path.auth.login(), login);

  // RUTAS DE USUARIO
  app.get(path.user.getUsers(), getUsers);
};
