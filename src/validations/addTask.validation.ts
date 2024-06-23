/** Jos */
import Joi from "joi";

const schema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    description: Joi.string().required().min(3).max(255),
});

export default schema;
