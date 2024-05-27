const Joi = require("joi");

module.exports = Joi.object({
    bookId: Joi.number().integer().required(),
    memberId: Joi.number().integer().required(),
})