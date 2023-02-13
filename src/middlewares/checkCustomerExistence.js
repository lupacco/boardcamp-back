import { db } from "../config/database.connection.js";

export async function checkCustomerExistence(req, res, next){
    const customerCpf = req.body.cpf
    console.log(customerCpf)

    try{
        let item = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [customerCpf])
        let customerExist = item.rowCount

        if(customerExist) return res.sendStatus(409)

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function checkCustomerExistenceById(req, res, next){
    let { id } = req.params;
    
    if(!id) id = req.body.customerId

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

export async function checkCustomerCpf(req, res, next){
    const reqCpf = req.body.cpf

    try{
        const cpfInUse = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [reqCpf])

        if(cpfInUse.rowCount) return res.sendStatus(409)

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}