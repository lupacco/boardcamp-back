import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customers.controllers.js";
import {
    checkCustomerCpf,
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
  validateSchema(customerSchema),
  checkCustomerExistenceById,
  checkCustomerCpf,
  updateCustomer
);

export default customersRouter;
