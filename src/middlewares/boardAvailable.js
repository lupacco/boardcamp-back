import { db } from "../config/database.connection.js";

export async function isBoardAvailable(req, res, next){
    const {gameId} = req.body
    try{
        const totalBoardsQuery = await db.query(`SELECT * FROM games WHERE id=$1`,[gameId])
        const boardStock = totalBoardsQuery.rows[0].stockTotal

        const rentedBoardsQuery = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`,[gameId])
        const rentedBoards = rentedBoardsQuery.rowCount

        if(rentedBoards >= boardStock) return res.sendStatus(400)

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}