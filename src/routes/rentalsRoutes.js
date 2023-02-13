import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { createRental, getRentals, finalizeRental, deleteRental } from "../controllers/rentals/rentals.controllers.js";

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id", finalizeRental)
rentalsRouter.delete("rentals/:id", deleteRental)

export default rentalsRouter