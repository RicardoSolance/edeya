import { Express } from "express";
import { index } from "../controller/sampler";
import PathGenerator from "./pathCreator";
import { getUsers, registerUser } from "../controller/Users";
import { login } from "../controller/Auth";
import { registerCompany } from "../controller/Company";
// import { createJob } from "../controller/jobs";
import { isAuthenticated as isAuth, isBusiness } from "../middlewares/auth";
import { registerRecruiter } from "../controller/Recruiter";

const path = new PathGenerator("", false);

export const routing = (app: Express): void => {
  app.get("/", index);

  // AUTH RUTES
  app.post(path.auth.login(), login);

  // USER ROUTES
  app.post(path.user.register(), registerUser);
  app.get(path.user.getUsers(), isAuth, isBusiness, getUsers);

  // COMPANY ROUTES
  app.post(path.company.register(), registerCompany);

  // RECRUITER ROUTES
  app.post(path.recruiter.register(), isAuth, isBusiness, registerRecruiter);
}
