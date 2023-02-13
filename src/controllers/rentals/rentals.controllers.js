import { db } from "../../config/database.connection.js";
import { getRentalsQuery } from "./utils/getRentalsQuery.js";
import dayjs from "dayjs";


export async function createRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    const today = dayjs(new Date()).format('YYYY/MM/DD')

    try{
        console.log(req.body)
        console.log(today)

        const gameRented = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
        const gamePricePerDay = gameRented.rows[0].pricePerDay

        console.log(typeof Number(daysRented))
        console.log(typeof gamePricePerDay)

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, today, daysRented, null, gamePricePerDay*Number(daysRented), null])

        return res.sendStatus(201)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function getRentals(req, res){
    try{
        const rentals = await db.query(getRentalsQuery)

        
        const rentalsFormated = rentals.rows

        console.log(rentalsFormated)

        return res.status(200).send(rentalsFormated)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function finalizeRental(req, res){}

export async function deleteRental(req, res){}