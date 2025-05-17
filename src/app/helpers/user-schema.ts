import joi from "joi";

const userSchema = {
  createUser: joi
    .object({
      username: joi.string().min(3).max(50).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    })
    .required(),

  updateUser: joi
    .object({
      username: joi.string().min(3).max(50),
      email: joi.string().email(),
      password: joi.string().min(6),
    })
    .required(),

  id: joi
    .object({
      id: joi.number().required(),
    })
    .required(),
};

export default userSchema;
