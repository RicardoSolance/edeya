import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Recruiter from "../model/Recruiter";
import BadRequestError from "../errors/BadRequestError";
import Job from "../model/Job";

// export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const email = res.locals.email;
//     const recruiterExist = await Recruiter.findOne(
//       { email },
//       {
//         company: 1,
//         _id: 1,
//       }
//     );
//     if (recruiterExist) {
//       const newJob = new Job({
//         ...req.body,
//         recruiterId: recruiterExist.id,
//         jobId: uuidv4(),
//         companyId: recruiterExist.company,
//       });
//       await newJob.save();
//       res.json({ message: "New job published" });
//     } else {
//       throw new BadRequestError("This recruiter is not active");
//     }

//     res.json(req.body);
//   } catch (error) {
//     next(error);
//   }
// };

// Función para manejar errores
const handleError = (error: unknown, next: NextFunction) => {
  next(error);
};

export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = res.locals.email;

    const recruiter = await Recruiter.findOne({ email }, { company: 1, _id: 1 });

    if (!recruiter) {
      throw new BadRequestError("This recruiter is not active");
    }

    const newJob = new Job({
      ...req.body,
      recruiterId: recruiter._id,
      jobId: uuidv4(),
      companyId: recruiter.company,
    });

    await newJob.save();
    res.json({ message: "New job published" });
  } catch (error) {
    handleError(error, next);
  }
};

export const jobList = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await Job.find({}).sort("-updatedAt").select("-recruiterId").populate({
      path: "companyId",
      select: "-recruiters",
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};
