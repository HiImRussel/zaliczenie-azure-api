/** Joi */
import Joi from "joi";

const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required().min(3).max(255),
    description: Joi.string().required().min(3).max(255),
    completed: Joi.boolean().required(),
});

export default schema;
