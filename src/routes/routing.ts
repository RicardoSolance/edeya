import { Express } from "express";
import { index } from "../controller/sampler";
import PathGenerator from "./pathCreator";
import { getInactiveUsers, getMe, getUsers, registerUser } from "../controller/Users";
import { login, session } from "../controller/Auth";
import { registerCompany } from "../controller/Company";
import { createJob, jobList } from "../controller/Job";
import { isAuthenticated as isAuth, isBusiness, isRecruiter, isAdmin } from "../middlewares/auth";
import { registerRecruiter } from "../controller/Recruiter";

const path = new PathGenerator("", false);

export default function routing(app: Express): void {
  app.get("/", index);

  // AUTH RUTES
  app.post(path.auth.login(), login);
  app.post(path.corporative.login(), session);

  // USER ROUTES
  app.post(path.user.register(), registerUser);
  app.get(path.user.getUsers(), isAuth, isBusiness, getUsers);
  app.get(path.user.getMe(), isAuth, getMe);

  // COMPANY ROUTES
  app.post(path.company.register(), registerCompany);

  // RECRUITER ROUTES
  app.post(path.recruiter.register(), isAuth, isBusiness, registerRecruiter);

  //JOB
  app.post(path.job.create(), isAuth, isRecruiter, createJob);
  app.get(path.job.getJobList(), jobList);

  //ADMIN
  app.get(path.admin.getInactiveUsers(), isAuth, isAdmin, getInactiveUsers);
}
