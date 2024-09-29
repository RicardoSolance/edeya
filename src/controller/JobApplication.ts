import { Request, Response, NextFunction } from "express";
import JobApplication from "../model/JobApplication";
import Recruiter from "../model/Recruiter";
import BadRequestError from "../errors/BadRequestError";
import { JobStatus } from "../types/jobApplicationTypes";
import Job from "../model/Job";
import AuditLog from "../model/AuditLog";

export const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId, recruiterId } = req.body;
    const userId = res.locals.id; //cojemos el id de los locals

    console.log("userId", userId);

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

//Obtener todas las aplicaciones de un usuario
export const getUserJobApplications = async (req: Request, res: Response, next: NextFunction) => {
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

/**
 * 
Esta funcion actuliza el estado de una applicación
 1. ID del usuario autenticado (asumimos que esto viene del middleware `isAuthenticated`);
 2. Verificar si el estado es válido;
 3. Busca la aplicación de la oferta
 4. Verificar que el usuario pertenece a la empresa que creó el trabajo
  *. Esto se maneja en el middleware `isCompanyCreator`, por lo que aquí solo se actualiza el estado si llega a este punto

  5. Actualizar el estado de la aplicación
 */

export const updateJobApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const userId = res.locals.id;

    if (!Object.values(JobStatus).includes(status)) {
      throw new BadRequestError("Invalid status");
    }

    const jobApplication = await JobApplication.findById(applicationId);
    if (!jobApplication) {
      throw new BadRequestError("Job application not found");
    }

    //guardamos el estado anterior para los AuditLogs (registrar las acciones de los usuarios)
    const oldStatus = jobApplication.status;
    jobApplication.status = status;
    await jobApplication.save();

    const auditLog = new AuditLog({
      action: "Update Job Application Status",
      userId: userId,
      jobApplicationId: jobApplication._id,
      details: `Status changed from ${oldStatus} to ${status}`,
    });
    await auditLog.save();

    res.status(200).json({ message: "Job application status updated", jobApplication });
  } catch (error) {
    next(error);
  }
};
