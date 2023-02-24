import { Router } from "express";
import { signInUser, signUpUser } from "../../controllers/signController/signController.js";
import { getMyUser } from "../../controllers/usersController/usersController.js";
import createToken from "../../middlewares/userRoutes/createToken.js";
import verifyRepeatedEmail from "../../middlewares/userRoutes/verifyRepeatedEmail.js";
import verifyRepeatedToken from "../../middlewares/userRoutes/verifyRepeatedToken.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { verifySchema } from "../../middlewares/verifySchema.js";
import { signInSchema } from "../../schemas/signInSchema.js";
import { signUpSchema } from "../../schemas/signUpSchema.js";

export const userRoutes = Router();

userRoutes.get("/users/me", validateToken, getMyUser);

userRoutes.post("/signup", verifySchema(signUpSchema), verifyRepeatedEmail, signUpUser);

userRoutes.post("/signin", verifySchema(signInSchema), signInUser, verifyRepeatedToken, createToken);


