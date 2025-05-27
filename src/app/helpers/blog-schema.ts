import joi from "joi";

const blogSchema = {
  createBlog: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
  updateBlog: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
  id: joi
    .object({
      id: joi.number().required(),
    })
    .required(),
};

export default blogSchema;
