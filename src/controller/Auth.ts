import user from "../model/User";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import { SHA256 } from "crypto-js";
import { SESSION_TIME } from "../constants/sessionTime";
import jwt from "jsonwebtoken";

const tokenSecret = "BornanComoMolaSeMereceUnaOla";

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();
    const existingUser = await user.findOne({ email, password: hashedPassword });
    if (existingUser) {
      if (!existingUser.active) {
        throw new BadRequestError("Usuario no activado. Contacta con el administrador.");
      }
      const expires = Date.now() + SESSION_TIME * 1000;
      const token = jwt.sign({ email, role: existingUser.role }, tokenSecret, { expiresIn: SESSION_TIME });
      res.json({
        email: email,
        token,
        expires,
        role: existingUser.role,
        id: existingUser._id,
        name: existingUser.name,
        surname: existingUser.surname,
        gender: existingUser.gender,
        profilePhoto: existingUser.profilePhoto,
      });
    } else throw new BadRequestError("Usuario y password no coinciden");
  } catch (error) {
    next(error);
  }
};

export { login };
