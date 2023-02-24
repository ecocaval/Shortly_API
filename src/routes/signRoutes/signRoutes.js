//* Libraries
import { Router } from "express";

//* Controllers
import { signInUser, signUpUser } from "../../controllers/signController/signController.js";

//* Middlewares
import createToken from "../../middlewares/userRoutes/createToken.js";
import verifyRepeatedEmail from "../../middlewares/userRoutes/verifyRepeatedEmail.js";
import verifyRepeatedToken from "../../middlewares/userRoutes/verifyRepeatedToken.js";
import { verifySchema } from "../../middlewares/verifySchema.js";

//* Schemas
import { signInSchema } from "../../schemas/signInSchema.js";
import { signUpSchema } from "../../schemas/signUpSchema.js";

export const signRoutes = Router();

signRoutes.post("/signup", verifySchema(signUpSchema), verifyRepeatedEmail, signUpUser);

signRoutes.post("/signin", verifySchema(signInSchema), signInUser, verifyRepeatedToken, createToken);
