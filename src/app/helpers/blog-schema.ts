import joi from "joi";

const blogSchema = {
  createBlog: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
};

export default blogSchema;
