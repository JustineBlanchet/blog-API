const Joi = require('joi');

const categorySchema = Joi.object({
    route: Joi.string().pattern(new RegExp('^\/[a-z0-9]*$')),
    label: Joi.string().min(2),
});

module.exports = categorySchema;
