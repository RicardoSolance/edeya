import { Request, Response, NextFunction } from "express";
import Job from "../model/Job";
import Company from "../model/Company";
import HttpError from "../errors/HttpError";
import httpCodes from "../helpers/httpCodes";

/**
 * Función para validar trabajo y empresa
 */

const findJobAndCompany = async (jobId: string) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new HttpError(httpCodes.NOT_FOUND, "Job not found");
  }

  const company = await Company.findById(job.companyId);
  if (!company) {
    throw new HttpError(httpCodes.NOT_FOUND, "Company not found");
  }

  return { job, company };
};

export const isCompanyCreator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.body; // Obtener ID del trabajo
    const userId = res.locals.id; // ID del usuario autenticado

    // Validar trabajo y empresa
    const { company } = await findJobAndCompany(jobId);

    // Comprobar si el usuario pertenece a la empresa que creó el trabajo
    if (company.recruiters.includes(userId)) {
      next(); // Continuar si pertenece
    } else {
      throw new HttpError(httpCodes.FORBIDDEN, "Not authorized to update this job application");
    }
  } catch (error) {
    next(error); // Manejo de errores
  }
};
