import Joi from "@hapi/joi";

export const gameSchema = Joi.object({
  name: Joi.string().min(1).required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().positive().required(),
  pricePerDay: Joi.number().positive().required(),
});
