import { db } from "../../config/database.connection.js"
import getShortenedUrl from "./utils/getShortenedUrl.js"

export async function getUrlById(req, res) {
    
    const { id } = { ...req.params }

    try {
        const response = await db.query(
            "SELECT id, short_url as shortUrl, url FROM urls WHERE id = $1",
            [id]
        )

        if (response.rowCount === 0) return res.sendStatus(404)

        return res.send(response.rows[0])

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function createShortenUrl(req, res) {

    const { url } = req.sanitizedBody

    const userId = req.userId

    const shortenedUrl = getShortenedUrl()

    let requestId

    try {
        const response = await db.query(
            'INSERT INTO urls (user_id, url, short_url) VALUES ($1, $2, $3)',
            [userId, url, shortenedUrl]
        )

        if (response.rowCount === 1) {
            const { rows } = await db.query('SELECT max(id) as "insertedId" FROM urls')
            requestId = rows[0].insertedId
        }

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.send({
        id: requestId,
        shortUrl: shortenedUrl
    }).status(201)
}