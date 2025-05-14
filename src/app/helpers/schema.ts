import joi from "joi";

const schema = {
  createBlog: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
  createUser: joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
  updateUser: joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
};

export default schema;
