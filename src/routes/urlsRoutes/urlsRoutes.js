import { Router } from "express";
import { createShortenUrl } from "../../controllers/urlsController/urlsController.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { verifySchema } from "../../middlewares/verifySchema.js";
import { shortenUrlSchema } from "../../schemas/shortenUrlSchema.js";

export const urlsRoutes = Router()

urlsRoutes.post('/urls/shorten', validateToken, verifySchema(shortenUrlSchema), createShortenUrl)