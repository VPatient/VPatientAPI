const Joi = require('@hapi/joi');

// register validation
const registerValidation = (body) =>{
    // create schema
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
            .required(),
        isAdmin: Joi.boolean()
    });

    // validate schema
    return schema.validate(body);
}

// login validation
const loginValidation = (body) =>{
    // create schema
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });

    // validate schema
    return schema.validate(body);
}

// query validation (objectId)
const queryValidation = (query) => {
    // create schema
    const schema = Joi.object({
        id: Joi.string()
        .hex()
        .length(24)
    });

    // validate schema
    return schema.validate(query);
}

// query validation (objectId)
const gradeQueryValidation = (query) => {
    // create schema
    const schema = Joi.object({
        id: Joi.string()
        .hex()
        .length(24),
        userId: Joi.string()
        .hex()
        .length(24)
    });

    // validate schema
    return schema.validate(query);
}

// body objectId validation
const idValidation = (id) => {
    // create single-condition schema
    const schema = Joi.string().hex().length(24).required();

    // get value
    const value = id;

    // validate schema
    return schema.validate(value);
}

// grade request validation
const gradeValidation = (body) => {
    // create schema
    const schema = Joi.object({
        patientId: Joi.string()
            .hex()
            .length(24)
            .required(),
        secret: Joi.string()
            .hex()
            .length(32)
            .required(),
        grade: Joi.number()
            .min(0)
            .max(100)
            .required()
    });

    // validate and return
    return schema.validate(body);
}

// export validations
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.queryValidation = queryValidation;
module.exports.idValidation = idValidation;
module.exports.gradeValidation = gradeValidation;
module.exports.gradeQueryValidation = gradeQueryValidation;