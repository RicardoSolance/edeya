import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import { SHA256 } from "crypto-js";
import { SESSION_TIME } from "../constants/sessionTime";
import jwt from "jsonwebtoken";
import User from "../model/User";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const userExist = await User.findOne({ email });

    if (userExist) {
      // throw new BadRequestError("Este correo ya tiene un usuario registrado.");
      res.json({ message: "Este correo ya tiene un usuario registrado." });
    } else {
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });

      await newUser.save();

      res.json({ message: " Usuario registrado" });
    }
  } catch (error) {
    next(error);
  }
};

//TODO: find a way to centralize the login
//user login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const hashedPassword = SHA256(password).toString();

    const userRegistered = await User.findOne({ email, password: hashedPassword });

    if (userRegistered) {
      const expires = Date.now() + SESSION_TIME * 1000;

      const token = jwt.sign(
        { token_type: "access", email, role: userRegistered.role },
        `${process.env.TOKEN_SECRET}`,
        {
          expiresIn: SESSION_TIME,
        }
      );

      res.json({ token, expires });
    } else {
      throw new BadRequestError("Usuario y password no coinciden");
    }
  } catch (error) {
    next(error);
  }
};
