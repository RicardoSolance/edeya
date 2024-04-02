import { Router } from "express";
import { registerUser, getUsers } from "../controller/Users";
const api = Router();

api.get("/users", getUsers);
api.post("/user", registerUser);

export default api;
