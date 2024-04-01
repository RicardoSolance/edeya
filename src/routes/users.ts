import { Request, Response, Router } from "express";
const router = Router();

router.get("/users", (_req: Request, res: Response) => {
  res.send("Hello from all users route");
});

export default router;
