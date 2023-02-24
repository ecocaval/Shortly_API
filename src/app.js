//* Libraries
import express from "express"
import cors from "cors"

//* Routes
import { userRoutes } from "./routes/usersRoutes/userRoutes.js";
import { urlsRoutes } from "./routes/urlsRoutes/urlsRoutes.js";
import { signRoutes } from "./routes/signRoutes/signRoutes.js";
import { rankingRoutes } from "./routes/rankingRoutes/rankingRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(signRoutes)
app.use(urlsRoutes)
app.use(rankingRoutes)

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT)
})