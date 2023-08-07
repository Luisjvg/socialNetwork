const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = function(injectedStore){
    // Si nos enviaron la DB seguimos, sino tenemos una predeterminada
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    async function login(body){
        const data = await store.query(TABLA, {username: body.username})

        if(body.password === data.password){
            return auth.sign(data)
        } else{
            throw new Error('Info invalida')
        }
    }

    function upsert(data){
        const dataAuth = {
            username: data.username,
            password: data.password
        }
        return store.upsert(TABLA, dataAuth)
    }
    return{
        upsert,
        login,
    }
}