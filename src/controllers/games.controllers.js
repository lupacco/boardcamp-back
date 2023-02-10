import { db } from "../config/database.connection.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {


    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', '${stockTotal}', '${pricePerDay}')`)

    return res.sendStatus(201)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
