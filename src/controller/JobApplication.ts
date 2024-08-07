import { Request, Response, NextFunction } from "express";
import JobApplication from "../model/JobApplication";
import User from "../model/User";
import Recruiter from "../model/Recruiter";
import BadRequestError from "../errors/BadRequestError";
import { JobStatus } from "../types/jobApplicationTypes";
import Job from "../model/Job";

export const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId, recruiterId } = req.body;
    const userId = User.name; //cambiarr esto

    // Verificar si el trabajo y el reclutador existen
    const job = await Job.findById(jobId);
    const recruiter = await Recruiter.findById(recruiterId);

    if (!job) {
      throw new BadRequestError("Job not found");
    }

    if (!recruiter) {
      throw new BadRequestError("Recruiter not found");
    }

    // Crear una nueva aplicación de trabajo
    const jobApplication = new JobApplication({
      userId,
      recruiterId,
      jobId,
      status: JobStatus.Applied,
    });

    await jobApplication.save();
    res.status(201).json({ message: "Application submitted successfully", jobApplication });
  } catch (error) {
    next(error);
  }
};
