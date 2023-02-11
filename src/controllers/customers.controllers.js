import { db } from "../config/database.connection.js";

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customer = await db.query(
      `INSERT INTO customers (name, phone, "cpf", "birthday") VALUES ($1, $2, $3, $4)`, [name,phone,cpf,birthday]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err)
    return res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await db.query(`SELECT * FROM customers`);

    return res.status(200).send(customers.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const customer = req.customer;
  
  try{
      return res.status(200).send(customer)
  }catch(err){
      console.log(err)
      return res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  try {
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
