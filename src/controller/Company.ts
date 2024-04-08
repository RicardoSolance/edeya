import { Request, Response, NextFunction } from "express";
import { SHA256 } from "crypto-js";
import Company from "../model/Company";

export const registerCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { companyEmail, password } = req.body;
  try {
    const hashedPassword = SHA256(password).toString();

    if (!companyEmail) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const companyExist = await Company.findOne({ companyEmail });

    if (companyExist) {
      res.json({ message: "Credenciales erroneas" });
    } else {
      const newCompany = new Company({
        ...req.body,
        password: hashedPassword,
      });

      await newCompany.save();

      res.json({ message: " Empresa registrada con exito" });
    }
  } catch (error) {
    next(error);
  }
};
