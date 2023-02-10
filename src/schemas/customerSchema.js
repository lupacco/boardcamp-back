import Joi from "@hapi/joi";

export const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().required(),
  cpf: Joi.string().required(),
  birthday: Joi.string().required(),
});
