const auth = require('../auth')
// Logica de conexion a la base de datos
const TABLA = 'user';

// Aqui nos enviaron la DB desde el index del user, pero lo validamos
module.exports = function(injectedStore){
    // Si nos enviaron la DB seguimos, sino tenemos una predeterminada
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    // Busqueda en DB obteniendo un objeto llamado 'user'
    function list (){
        return store.list(TABLA)
    }
    // Buscamos en la DB un user por su id, ese ID lo recibimos del network.
    function get (id){
        return store.get(TABLA, id)
    }
    /**
     * 
     * @param {data} Es el body de nuestra peticion post
     * @returns respuesta de la DB con el nuevo usuario agregado
     */    
    async function upsert(data){
        const user = {
            name: data.name,
            username: data.username,
        }
        if(data.username || data.password){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }
        return store.upsert(TABLA, user)
    }

    return {
        list,
        get,
        upsert,
    }
}