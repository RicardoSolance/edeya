import { Request, Response, NextFunction } from "express";
// import BadRequestError from "../errors/BadRequestError";
import User from "../model/User";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("entraaaaa");
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};
