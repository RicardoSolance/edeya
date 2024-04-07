import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../errors/HttpError";
import httpCodes from "../helpers/httpCodes";
import { userTypes } from "../types/userTypes";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorization = req.headers.authorization;
  try {
    if (authorization) {
      const token = authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.TOKEN_SECRET || "secret");

      if (typeof payload === "object") {
        res.locals.email = payload.email;
        res.locals.role = payload.role;
      }

      next();
    } else {
      throw new HttpError(httpCodes.UNAUTHORIZED, "token requerido");
    }
  } catch (error: any) {
    const errorsArray = ["jwt malformed", "invalid signature"];

    if (error.message === "jwt expired") next(new HttpError(httpCodes.UNAUTHORIZED, "Token caducado"));

    if (errorsArray.includes(error.message)) {
      next(new HttpError(httpCodes.UNAUTHORIZED, "Token no válido"));
    } else next(error);
  }
};

export const isRecruiter = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (res.locals.role === userTypes[1]) next();
  else next(new HttpError(httpCodes.FORBIDDEN, "permiso denegado"));
};

export const isBusiness = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (res.locals.role === userTypes[2]) next();
  else next(new HttpError(httpCodes.FORBIDDEN, "permiso denegado"));
};
