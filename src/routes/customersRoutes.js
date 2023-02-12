import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customers.controllers.js";
import {
  checkCustomerExistence,
  checkCustomerExistenceById,
} from "../middlewares/checkCustomerExistence.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const customersRouter = Router();

customersRouter.post(
  "/customers",
  validateSchema(customerSchema),
  checkCustomerExistence,
  createCustomer
);
customersRouter.get("/customers", getCustomers);
customersRouter.get(
  "/customers/:id",
  checkCustomerExistenceById,
  getCustomerById
);
customersRouter.put(
  "/customers/:id",
  checkCustomerExistenceById,
  validateSchema(customerSchema),
  checkCustomerExistence,
  updateCustomer
);

export default customersRouter;
