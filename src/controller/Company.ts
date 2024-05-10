import { Request, Response, NextFunction } from "express";
import { SHA256 } from "crypto-js";
import Company from "../model/Company";

export const registerCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { companyEmail, password } = req.body;
  try {
    const hashedPassword = SHA256(password).toString();

    if (!companyEmail) res.status(400).send({ msg: "email is mandatory" });

    if (!password) res.status(400).send({ msg: "password is mandatory" });

    const companyExist = await Company.findOne({ companyEmail });

    if (companyExist) {
      res.json({ message: "wrong credential" });
    } else {
      const newCompany = new Company({
        ...req.body,
        password: hashedPassword,
      });

      await newCompany.save();

      res.json({ message: "The company has been registered" });
    }
  } catch (error) {
    next(error);
  }
};
