const joi = require('@hapi/joi');

const id = joi.number().integer();
const name = joi.string();
const password = joi.number().integer();

const userSchema = joi.object({
    id: id.required(),
    name: name.required(),
    username: name.required(),
    password: password.required()
})

const userAuth = joi.object({
    username: name.required(),
    password: password.required()

})

function validator(schema, property){
    return(req, res, next) => {
        const data = req[property]
        const { error } = schema.validate(data, { abortEarly: false })
        if(error){
            next(res.status(400).send('Algo rompiste bro'))
        }
        next()
    }
}
module.exports = {
    userSchema,
    userAuth,
    validator
}