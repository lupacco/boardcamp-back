import { db } from "../config/database.connection.js";

export default async function checkGameExistence(req, res, next){
    const gameName = req.body.name

    try{
        let item = await db.query(`SELECT * FROM games WHERE name = $1`, [gameName])
        let gameExist = item.rowCount

        if(gameExist) return res.sendStatus(409)

        next()
    }catch(err){
        return res.sendStatus(500)
    }
}