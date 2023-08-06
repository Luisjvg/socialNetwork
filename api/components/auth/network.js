const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();
const {userAuth, validator} = require('../../schema/schema')

router.post('/login', 
/**
 * userSchema es el schme
 * 'body' es la propiedad que sacaremos del request
 * Validator() es la funcion que valida si lo que nos envia el usuario concuerda con el schema
 */
validator(userAuth, 'body'),
function(req, res){
    /*Enviamos el body al controller*/
    controller.login(req.body)
    .then((token) => {
        response.success(req, res, token, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
        })
})

module.exports = router;