const Joi = require("joi");

module.exports = Joi.object({
    borrowId: Joi.number().integer().required(),
    memberId: Joi.number().integer().required(),
})