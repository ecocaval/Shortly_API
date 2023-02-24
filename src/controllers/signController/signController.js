//* Libraries
import bcrypt from "bcrypt"

//* Configurations
import { db } from "../../config/database.connection.js";

export async function signUpUser(req, res, next) {
    const { name, email, password } = req.sanitizedBody

    try {
        await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, bcrypt.hashSync(password, 10)]
        )
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.sendStatus(201)
}

export async function signInUser(req, res, next) {
    const { email, password: passwordSent } = req.sanitizedBody

    try {
        const response = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (response.rowCount === 0) return res.sendStatus(401)

        const { id, password: passwordInDb } = response.rows[0]

        req.sanitizedBody.userId = id

        if(!(bcrypt.compareSync(passwordSent, passwordInDb))) return res.sendStatus(401)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}