// Base de datos generica
const db = {
    'user': [
        {
        id: 1,
        name: 'Carlos'
        }
    ]
};


async function list (tabla){
    return db[tabla] || [];
}

async function get (tabla, id){
    // col = todos los elementos de la tabla que se le envia. Ej('user')
    let col = await list(tabla);
    // Filtramos los items de ese obj ('user') y validamos por su ID, si es true nos traera el primer elemento
    return col.filter(item => item.id == id)[0] || null;
}
/**
 * 
 * @param {*} tabla Es la tabla que buscaremos en nuestra DB
 * @param {*} data Es el usuario que agregaremos
 * @returns Toda la tabla que solicitamos en la DB
 */
async function upsert (tabla, data){
    if(db[tabla]){
        db[tabla].push(data)
    } else{
        db[tabla] = []
    }
    return db[tabla]
    
    // db[tabla].push(data)
    // console.log(db)
    // return db[tabla];
}

async function remove (tabla, id){
    return true;
}

async function query(tabla, q){
    let col = await list(tabla);
    let keys = Object.keys(q)
    let key = keys[0]
    const rta = col.filter(item => item[key] === q[key])[0] || null
    return rta 
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}