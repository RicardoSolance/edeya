import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import bcrypt from "bcrypt";
import User from "../model/User";

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name, surname } = req.body;
  const salt = bcrypt.genSaltSync(10);

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.findOne({ email, password: hashedPassword });
    if (user) {
      throw new BadRequestError("Este ya existe");
    } else {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        name,
        surname,
      });

      await newUser.save();
      res.json({ message: email + " Usuario registrado" });
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser };
