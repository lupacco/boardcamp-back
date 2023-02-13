import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { checkCustomerExistenceById } from "../middlewares/checkCustomerExistence.js";
import { checkGameExistenceById } from "../middlewares/checkGameExistence.js";
import { createRental, getRentals, finalizeRental, deleteRental } from "../controllers/rentals/rentals.controllers.js";

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), checkCustomerExistenceById, checkGameExistenceById,createRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id", finalizeRental)
rentalsRouter.delete("rentals/:id", deleteRental)

export default rentalsRouter