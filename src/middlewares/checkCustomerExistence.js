import { db } from "../config/database.connection.js";

export async function checkCustomerExistence(req, res, next){
    const customerCpf = req.body.cpf

    try{
        let itemName = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [customerCpf])
        let customerExist = itemName.rowCount

        console.log(req)

        if(customerExist) return res.sendStatus(409)

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function checkCustomerExistenceById(req, res, next){
    const { id } = req.params;

    try{
        let item = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])
        let customerExist = item.rowCount
        
        if(!customerExist) return res.sendStatus(404)

        req.customer = item.rows[0]

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}