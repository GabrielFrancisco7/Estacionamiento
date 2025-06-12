// archivo de configuracion de la base de datos
import connect from "../middlewares/db.mjs";

async function buscarUsuario(usuario, contrasena) {
    // Establecemos la conexión a la base de datos
    const db = await connect();

    try {
        // Consulta para obtener todos los registros //
        const [rows] = await db.execute("SELECT id FROM usuarios WHERE usuario = ? AND contrasena = ?",[usuario, contrasena]);

        
        // Se retornan los registros
        return Promise.resolve(rows);
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error: ", error);
        return Promise.reject("Ocurrio un error al intentar obtener los datos");
    } finally {
        // Cerramos la conexión a la base de datos, independientemente del resultado
        db.end();
    }
}

async function obtenerRegistros() {
    // Establecemos la conexión a la base de datos
    const db = await connect();

    try {
        // Consulta para obtener todos los registros
        const [rows] = await db.execute("SELECT * FROM usuarios");

        // Se retornan los registros
        return Promise.resolve(rows);
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error: ", error);
        return Promise.reject("Ocurrio un error al intentar obtener los datos");
    } finally {
        // Cerramos la conexión a la base de datos, independientemente del resultado
        db.end();
    }
}

async function crearRegistro(nombre) {
    // Establecemos la conexión a la base de datos
    const db = await connect();

    try {
        // Ejecutamos la consulta SQL para insertar datos
        const [result] = await db.execute("INSERT INTO usuarios (nombre) VALUES (?)", [nombre]);

        // Se devuelve el resultado de la operación
        console.log("Insertado: ", result);
        return Promise.resolve("OK");
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error: ", error);
        return Promise.reject("Ocurrio un error al intentar agregar registros");
    } finally {
        // Cerramos la conexión a la base de datos, independientemente del resultado
        db.end();
    }
}


export default {
    buscarUsuario,
    obtenerRegistros,
    crearRegistro
}