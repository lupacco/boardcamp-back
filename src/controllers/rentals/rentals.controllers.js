import { db } from "../../config/database.connection.js";
import { getRentalsQuery } from "./utils/getRentalsQuery.js";
import dayjs from "dayjs";

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const today = dayjs(new Date()).format("YYYY/MM/DD");

  try {
    console.log(req.body);

    const gameRented = await db.query(`SELECT * FROM games WHERE id=$1`, [
      gameId,
    ]);
    const gamePricePerDay = gameRented.rows[0].pricePerDay;

    await db.query(
      `
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
      [
        customerId,
        gameId,
        today,
        daysRented,
        null,
        gamePricePerDay * Number(daysRented),
        null,
      ]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  const {customerId, gameId} = req?.query

  try {
    let query = getRentalsQuery

    if(customerId){
      query += `\nWHERE "customerId"='${customerId}'`//
    }
    if(gameId){
      query += `\nWHERE "gameId"='${gameId}'`//
    }

    console.log(query)

    const rentals = await db.query(query);

    const rentalsFormated = rentals.rows;

    return res.status(200).send(rentalsFormated);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function finalizeRental(req, res) {
  const rental = req.rental;
  const today = dayjs(new Date()).format("YYYY/MM/DD");
  try {
    const rentDate = dayjs(rental.rentDate).format("YYYY/MM/DD");
    const expectedReturnDate = dayjs(rentDate).add(rental.daysRented, "day");

    let delayDays = dayjs(today).diff(expectedReturnDate, "day");

    if (delayDays < 0) delayDays = 0;

    const gamePriceQuery = await db.query(
      `SELECT "pricePerDay" from games WHERE id=$1`,
      [rental.gameId]
    );
    const gamePricePerDay = gamePriceQuery.rows[0].pricePerDay;

    const delayFee = delayDays * gamePricePerDay;

    await db.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
      [today, delayFee, rental.id]
    );

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const rental = req.rental;

  try {
    await db.query(`DELETE FROM rentals WHERE id=$1`, [rental.id]);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
