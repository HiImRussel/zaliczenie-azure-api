/** Joi */
import Joi from "joi";

const updateUserSchema = Joi.object({
    isAdmin: Joi.boolean(),
});

export default updateUserSchema;
