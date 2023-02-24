//* Libraries
import { sanitizeBody } from "../utils/sanitizeBody.js"

//* Configurations
import { db } from "../../config/database.connection.js"

export default async function verifyRepeatedEmail(req, res, next) {
    req.sanitizedBody = sanitizeBody({ ...req.body })

    const { email } = req.sanitizedBody

    try {
        const { rowCount } = await db.query("SELECT * FROM users WHERE email = $1", [email])

        if(rowCount !== 0) return res.sendStatus(409)
        
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
    next()
}