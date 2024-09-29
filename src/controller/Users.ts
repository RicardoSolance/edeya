import { Request, Response, NextFunction } from "express";
// import BadRequestError from "../errors/BadRequestError";
import User from "../model/User";
import { SHA256 } from "crypto-js";
import { userTypes } from "../types/userTypes";
import BadRequestError from "../errors/BadRequestError";
import UserProfile from "../model/UserProfile";
import JobApplication from "../model/JobApplication";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = SHA256(password).toString();

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    if (!password) res.status(400).send({ msg: "la contrseña es obligatoria" });

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new BadRequestError("Wrong credentials");
    } else {
      // const company = res.locals.role === userTypes[2];

      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        role: userTypes[0],
      });

      const savedUser = await newUser.save();
      const newUserProfile = new UserProfile({ userId: savedUser._id });
      const savedProfile = await newUserProfile.save();
      savedUser.userProfileId = savedProfile.id;
      await savedUser.save();

      res.json({ message: "User registered" });
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
export const getMe = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const email = res.locals.email;
    const user = await User.findOne({ email }).populate({
      path: "userProfileId",
      select: "-userId -status",
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
// export const editMe = async (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userEmail = res.locals.email;
//     const userExist = await User.findOne({ email: userEmail });

//     if (!userExist) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(userEmail);
//   } catch (error) {
//     next(error);
//   }
// };

export const getInactiveUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ active: false });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

//Obtener todas las aplicaciones de un usuario
export const getMyJobApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = res.locals.id;

    const applications = await JobApplication.find({ userId });

    if (!applications || applications.length === 0) {
      throw new BadRequestError("No job applications found for this user");
    }

    res.status(200).json({ applications });
  } catch (error) {
    next(error);
  }
};
