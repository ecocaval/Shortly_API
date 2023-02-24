//* Libraries
import { Router } from "express";

//* Controllers
import { getMyUser } from "../../controllers/usersController/usersController.js";

//* Middlewares
import { validateToken } from "../../middlewares/validateToken.js";

export const userRoutes = Router();

userRoutes.get("/users/me", validateToken, getMyUser);

