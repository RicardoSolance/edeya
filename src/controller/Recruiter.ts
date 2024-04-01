import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Recruiter from "../model/Recruiter";
import { userTypes } from "../types/userTypes";
import { SHA256 } from "crypto-js";
import Company from "../model/Company";

export const registerRecruiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const hashedPassword = SHA256(password).toString();

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const recruiterExist = await Recruiter.findOne({ email });

    const companyEmail = res.locals.email;
    const company = await Company.findOne({ companyEmail });

    if (recruiterExist) {
      res.json({ message: "Credenciales erroneas" });
    } else {
      const newRecruiter = new Recruiter({
        ...req.body,
        password: hashedPassword,
        role: userTypes[1],
        company: company?.id,
      });

      await newRecruiter.save();
      if (company) {
        company.recruiters.push(newRecruiter.id);
        await company.save();
      }

      res.json({ message: " recruiter registrada con exito" });
    }
  } catch (error) {
    next(error);
  }
};
