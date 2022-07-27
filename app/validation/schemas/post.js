const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().min(2),
    slug: Joi.string().pattern(new RegExp('^[a-zÀ-ÿ0-9-]+-[a-zA-ZÀ-ÿ0-9-]+$')),
    excerpt: Joi.string().min(2),
    content: Joi.string().min(2),
    category_id: Joi.number(),
});

module.exports = postSchema;
