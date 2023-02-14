import Joi from "@hapi/joi";

export const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().required(),
  cpf: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  birthday: Joi.string()
    .pattern(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/)
    .required(),
});
