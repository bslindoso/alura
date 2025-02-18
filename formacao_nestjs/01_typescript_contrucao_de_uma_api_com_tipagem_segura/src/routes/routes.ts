import { Router } from "express";
import petRouter from "./petRouter";

const router = (app: Router) => {
  app.use("/pets", petRouter);
}

export default router;