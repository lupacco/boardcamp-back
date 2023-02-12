import { db } from "../config/database.connection.js";

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await db.query(
        `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
        [name, phone, cpf, birthday]
        );
    return res.sendStatus(201);

  } catch (err) {
    console.log(err);
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

  try {
    return res.status(200).send(customer);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const newData = req.body  
  try {
    await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id = $5`,[newData.name, newData.phone, newData.cpf, newData.birthday, id])
    console.log(newData)

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
