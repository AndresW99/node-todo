
const fs = require('fs');

let listadoPorHacer = [];

const db = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile( 'db/data.json', data, (err)=> {
        if ( err ) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        
        listadoPorHacer = [];

    }

}

const crear = (descripcion) => {

    cargarDB();
    
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push( porHacer );

    db();

    return porHacer;
}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;
}

const actualizar = ( descripcion, completado ) => {

    cargarDB();

  let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

    if ( index >= 0 ) {
      listadoPorHacer[index].completado = completado;
      db();
      return true;
    }else {
      return false;
    }
}

const borrar = ( descripcion ) => {

    cargarDB();

    let index = listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion
    });

    if ( listadoPorHacer.length  === index.length ) {
        return false;
    } else {
        listadoPorHacer = index;
        db();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}