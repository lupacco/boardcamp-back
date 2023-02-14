import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { checkCustomerExistenceById } from "../middlewares/customerValidations.js";
import { checkGameExistenceById } from "../middlewares/gameValidations.js";
import { isBoardAvailable } from "../middlewares/boardAvailable.js";
import {
  createRental,
  getRentals,
  finalizeRental,
  deleteRental,
} from "../controllers/rentals/rentals.controllers.js";
import {
  checkIfCanDeleteRental,
  checkIfRentalIsFinalized,
  checkRentalExistence,
} from "../middlewares/rentalValidations.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post(
  "/rentals",
  validateSchema(rentalSchema),
  checkCustomerExistenceById,
  checkGameExistenceById,
  isBoardAvailable,
  createRental
);
rentalsRouter.post(
  "/rentals/:id/return",
  checkRentalExistence,
  checkIfRentalIsFinalized,
  finalizeRental
);
rentalsRouter.delete(
  "/rentals/:id",
  checkRentalExistence,
  checkIfCanDeleteRental,
  deleteRental
);

export default rentalsRouter;
