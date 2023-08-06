const express = require('express')
const swaggerUi = require('swagger-ui-express')

const config = require ('../config.js')
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const swaggerDoc = require('./openapi.json')

const app = express();
app.use(express.json())


// Routes
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Inicio de la app
app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port)
})