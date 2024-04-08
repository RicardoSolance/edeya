import { Request, Response, NextFunction } from "express";
// import BadRequestError from "../errors/BadRequestError";
import User from "../model/User";
import { SHA256 } from "crypto-js";
import { userTypes } from "../types/userTypes";
import BadRequestError from "../errors/BadRequestError";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new BadRequestError("Este correo ya tiene un usuario registrado.");
    } else {
      const company = res.locals.role === userTypes[2];

      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        role: company ?? userTypes[1],
      });

      await newUser.save();

      res.json({ message: " Usuario registrado" });
    }
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};
