import User from "../model/User";
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
    const user = await User.findOne({ email, password: hashedPassword });
    if (user) {
      if (!user.active) {
        throw new BadRequestError("Usuario no activado. Contacta con el administrador.");
      }
      const expires = Date.now() + SESSION_TIME * 1000;
      const token = jwt.sign({ email, role: user.role }, tokenSecret, { expiresIn: SESSION_TIME });
      res.json({
        email: email,
        token,
        expires,
        role: user.role,
        id: user._id,
        name: user.name,
        surname: user.surname,
        nickName: user.nickName,
        profilePhoto: user.profilePhoto,
      });
    } else throw new BadRequestError("Usuario y password no coinciden");
  } catch (error) {
    next(error);
  }
};
