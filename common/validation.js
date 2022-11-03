//VALIDATION
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (body) =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        studentNumber: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    //VALIDATE DATA BEFORE INSERT
    return schema.validate(body);
}

//Login validation
const loginValidation = (body) =>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    //VALIDATE DATA BEFORE INSERT
    return schema.validate(body);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;