const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();
const {userSchema, validator} = require('../../schema/schema')

// Rutas de la capa Network de "User"
router.get('/', function(req, res) {
    // Conexion al index de user 
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
    //Respuesta con parametros predeterminados
    
})
router.get('/:id', function(req, res){
    /** Enviamos el ID al controller por medio del index que tiene el componente user || No es necesario un const porque desde store nos envian una promesa **/

    controller.get(req.params.id)
        .then((user) => {
        response.success(req, res, user, 200)
        })  
        .catch((err) => {
        response.error(req, res, err.message, 500)
        })
})
router.post('/', 
/**
 * userSchema es el schme
 * 'body' es la propiedad que sacaremos del request
 * Validator() es la funcion que valida si lo que nos envia el usuario concuerda con el schema
 */
validator(userSchema, 'body'),
function(req, res){
    /*Enviamos el body al controller*/
    controller.upsert(req.body)
    .then((data) => {
        response.success(req, res, data, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
        })
})



module.exports = router