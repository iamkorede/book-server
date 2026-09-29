import Joi from "joi";

export const bookUploadSchema = Joi.object({
    book_title: Joi.string().required(),
    book_author: Joi.string().required(),
}).required().options({ stripUnknown: true });


export const bookUpdateSchema = Joi.object({
    book_title: Joi.string().optional(),
    book_author: Joi.string().optional(),
}).required().options({ stripUnknown: true });

