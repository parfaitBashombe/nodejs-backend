import joi from "joi";

const schema = {
  createBlog: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
};

export default schema;
