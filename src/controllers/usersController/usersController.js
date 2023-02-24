import { db } from "../../config/database.connection.js";

export async function getMyUser(req, res) {
    const userId = req.userId 
    try {

        const response = await db.query(
            `
            SELECT 
                users.id, 
                users.name, 
                SUM(urls.visit_count) as "visitCount",
                JSON_AGG(JSON_BUILD_OBJECT(
                    'id', urls.id,
                    'shortUrl', urls.short_url,
                    'url', urls.url,
                    'visitCount', urls.visit_count
                  )) as "shortenedUrls"           
            FROM users
            LEFT JOIN urls ON users.id = urls.user_id            
            WHERE users.id = $1
            GROUP BY users.id;
            `,
            [userId]
        )        
        return res.send(response.rows[0])

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}