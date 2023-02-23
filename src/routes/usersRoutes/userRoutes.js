import { Router } from "express";
import { signInUser, signUpUser } from "../../controllers/signController/signController.js";
import createToken from "../../middlewares/userRoutes/createToken.js";
import verifyRepeatedEmail from "../../middlewares/userRoutes/verifyRepeatedEmail.js";
import verifyRepeatedToken from "../../middlewares/userRoutes/verifyRepeatedToken.js";
import { verifySchema } from "../../middlewares/verifySchema.js";
import { signInSchema } from "../../schemas/signInSchema.js";
import { signUpSchema } from "../../schemas/signUpSchema.js";

export const userRoutes = Router();

userRoutes.post("/signup", verifySchema(signUpSchema), verifyRepeatedEmail, signUpUser);

userRoutes.post("/signin", verifySchema(signInSchema), signInUser, verifyRepeatedToken, createToken);


