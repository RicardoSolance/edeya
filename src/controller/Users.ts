import { Request, Response, NextFunction } from "express";
// import BadRequestError from "../errors/BadRequestError";
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

async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    console.log("entraaaaa");
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export { getUsers };
