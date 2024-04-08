import "dotenv/config";
import { Request, Response, NextFunction } from "express";
// import BadRequestError from "../errors/BadRequestError";
// import { SHA256 } from "crypto-js";
// import { SESSION_TIME } from "../constants/sessionTime";
// import Job from "../model/Job";

export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.body;
    res.json({ title });
  } catch (error) {
    next(error);
  }
};
