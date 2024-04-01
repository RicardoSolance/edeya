import { Request, Response, NextFunction } from "express";

export const index = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.send("<h1>edeyá Backend</h1>");
  } catch (error) {
    next(error);
  }
};
