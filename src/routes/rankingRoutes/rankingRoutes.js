//* Libraries
import { Router } from "express";

//* Controllers
import { getRanking } from "../../controllers/rankingController/rankingController.js";

export const rankingRoutes = Router()

rankingRoutes.get("/ranking", getRanking)