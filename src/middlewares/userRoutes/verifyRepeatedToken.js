//* Configurations
import { db } from "../../config/database.connection.js"

export default async function verifyRepeatedToken(req, res, next) {

    const id = req.sanitizedBody.userId

    try {

        const response = await db.query('SELECT token FROM tokens WHERE "user_id" = $1', [id])

        if (response.rowCount !== 0) {
            const { token } = response.rows[0]

            return res.send({ token })
        }

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}