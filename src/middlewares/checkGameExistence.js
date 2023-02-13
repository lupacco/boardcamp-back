import { db } from "../config/database.connection.js";

export async function checkGameExistence(req, res, next){
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

export async function checkGameExistenceById(req, res, next){
    const {gameId} = req.body

    try{
        const gameQuery = await db.query(`SELECT * FROM games WHERE id=$1`,[gameId])
        const gameExist = gameQuery.rowCount

        if(!gameExist) return res.sendStatus(400)
        
        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}