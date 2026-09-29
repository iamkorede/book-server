import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const userSignupSchema = Joi.object({
    username: Joi.string().min(2).max(10).required(),
    password: Joi.string().regex(passwordRegex)
    .messages({
      'string.pattern.base': 'password must have 1 lower case, 1 uppercase, 1 special character, 1 number and be more than 8 char long'
    }).required(),
    email: Joi.string().email().required(),
    fullname: Joi.string().required()
}).required().options({ stripUnknown: true});


export const userLoginSchema = Joi.object({
    password: Joi.string().regex(passwordRegex).messages({
      'string.pattern.base': 'password must have 1 lower case, 1 uppercase, 1 special character, 1 number and be more than 8 char long'
    }).required(),
    email: Joi.string().email().required(),
}).required().options({stripUnknown: true})