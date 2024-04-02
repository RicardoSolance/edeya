import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import bcrypt from "bcrypt";
import User from "../model/User";

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name, surname } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Credenciales erroneas");
    } else {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        name,
        surname,
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
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export { registerUser, getUsers };
