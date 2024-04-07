import { Express } from "express";
import { index } from "../controller/sampler";
import PathGenerator from "./pathCreator";
import { getUsers } from "../controller/Users";
import { registerUser, login } from "../controller/Auth";
import { registerCompany } from "../controller/Company";
// import { createJob } from "../controller/jobs";
import { isAuthenticated as isAuth, isBusiness as isAdmin } from "../middlewares/auth";

const path = new PathGenerator("", false);

export default function routing(app: Express): void {
  app.get("/", index);

  // AUTH RUTES
  app.post(path.auth.login(), login);

  // USER ROUTES
  app.post(path.user.register(), registerUser);
  app.get(path.user.getUsers(), isAuth, isAdmin, getUsers);

  // RECRUITER ROUTES
  app.post(path.company.register(), registerCompany);
}
