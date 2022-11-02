const joi = require('joi');

const validateSignUp = (user) => {
    const schema = joi.object({
        fullname: joi.string().min(3).required(),
        email: joi.string().email().required(),
        gender: joi.string().required(),
        password: joi.string().min(3).required(),
        phone: joi.string().min(11).required(),
        address: joi.string().required(),
    })
    return schema.validate(user);
}

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    return schema.validate
}

module.exports = { validateSignUp, validateLogin }