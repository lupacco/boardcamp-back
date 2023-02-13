import { db } from "../../config/database.connection.js";
import { getRentalsQuery } from "./utils/getRentalsQuery.js";


export async function createRental(req, res){
    try{

    }catch(err){

    }
}

export async function getRentals(req, res){
    try{
        const rentals = await db.query(getRentalsQuery)

        
        const rentalsFormated = rentals.rows

        console.log(rentalsFormated)

        return res.status(200).send(rentalsFormated)
    }catch(err){
        
    }
}

export async function finalizeRental(req, res){}

export async function deleteRental(req, res){}