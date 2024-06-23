/** Joi */
import Joi from "joi";

const newUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default newUserSchema;
