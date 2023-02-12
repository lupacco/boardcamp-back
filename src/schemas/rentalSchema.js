import Joi from "@hapi/joi";

export const rentalSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  rentDate: Joi.string().required(),
  daysRented: Joi.number().positive().integer().required(),
  returnDate: Joi.string().required(),
  originalPrice: Joi.string().required(),
  delayFee: Joi.string().required(),
});
