import { db } from "../config/database.connection.js";

export async function checkCustomerExistence(req, res, next){
    const url = req.url.slice(1)
    const customerCpf = req.body.cpf

    try{
        let itemName = await db.query(`SELECT * FROM customer WHERE cpf = '${customerCpf}'`)
        let customerExist = itemName.rowCount

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
        let item = await db.query(`SELECT * FROM customers WHERE id = '${id}'`)
        let customerExist = item.rowCount
        
        if(!customerExist) return res.sendStatus(404)

        console.log(item.rows[0])

        req.customer = item.rows[0]

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}