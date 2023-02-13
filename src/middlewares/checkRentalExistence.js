import { db } from "../config/database.connection.js";

export async function checkRentalExistence(req, res, next){
    const {id} = req.params
    try{
        const rentalQuery = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        const rentalExist = rentalQuery.rowCount

        if(!rentalExist) return res.sendStatus(404)

        req.rental = rentalQuery.rows[0]

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export function checkIfRentalIsFinalized(req, res, next){
    const rental = req.rental

    if(rental.returnDate) return res.sendStatus(400)
    
    next()
}

export function checkIfCanDeleteRental(req, res, next){
    const rental = req.rental

    if(!rental.returnDate) return res.sendStatus(400)

    next()
}