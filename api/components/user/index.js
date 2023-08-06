const store = require('../../../store/dummy')
const ctrl = require('./controller')

// Tomamos el controlador y le enviamos la DB
module.exports = ctrl(store)