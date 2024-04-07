import { Request, Response, NextFunction } from "express";
import { SHA256 } from "crypto-js";
import Recruiter from "../model/Recruiter";

export const registerRecruiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { companyEmail, password } = req.body;
  try {
    const hashedPassword = SHA256(password).toString();

    if (!companyEmail) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const recruiterExist = await Recruiter.findOne({ companyEmail });

    if (recruiterExist) {
      res.json({ message: "Este correo ya tiene un usuario registrado." });
    } else {
      const newUser = new Recruiter({
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
