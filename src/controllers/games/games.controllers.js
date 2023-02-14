import { db } from "../../config/database.connection.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
      [name, image, stockTotal, pricePerDay]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  const {name} = req?.query
  let query = `SELECT * FROM games`
  
  try {
    if(name){
      query += ` WHERE name ILIKE '${name}%'`
    }
    const games = await db.query(query);

    return res.status(200).send(games.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
