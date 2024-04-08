import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import { SHA256 } from "crypto-js";
import { SESSION_TIME } from "../constants/sessionTime";
import jwt from "jsonwebtoken";
import User from "../model/User";
import Company from "../model/Company";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { companyEmail, email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();

    let userRegistered;

    if (companyEmail) {
      userRegistered = await Company.findOne({ companyEmail: companyEmail, password: hashedPassword });
    } else {
      userRegistered = await User.findOne({ email, password: hashedPassword });
    }

    if (userRegistered) {
      const expires = Date.now() + SESSION_TIME * 1000;
      const signedEmail = companyEmail ? companyEmail : email;

      const token = jwt.sign(
        { token_type: "access", email: signedEmail, role: userRegistered.role },
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
