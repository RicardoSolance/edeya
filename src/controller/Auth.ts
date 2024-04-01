import "dotenv/config";
import user from "../model/User";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import { SHA256 } from "crypto-js";
import { SESSION_TIME } from "../constants/sessionTime";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();
    const existingUser = await user.findOne({ email, password: hashedPassword });
    if (existingUser) {
      if (!existingUser.active) {
        throw new BadRequestError("Usuario no activado. Contacta con el administrador.");
      }
      const expires = Date.now() + SESSION_TIME * 1000;
      const token = jwt.sign({ email, role: existingUser.role }, `${process.env.TOKEN_SECRET}`, { expiresIn: SESSION_TIME });
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
