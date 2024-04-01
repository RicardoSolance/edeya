import { Request, Response, Router } from "express";
import { registerUser } from "../controller/Users";
const api = Router();

api.get("/users", (_req: Request, res: Response) => {
  res.send("Hello from all users route");
});
api.post("/user", registerUser);

export default api;
