import { db } from "../../config/database.connection.js"
import getShortenedUrl from "./utils/getShortenedUrl.js"

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