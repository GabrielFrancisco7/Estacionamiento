// aqui se realiza la conexion
// libreria
import mysql from "mysql2/promise";

async function connect() {
    try {
        const db = await mysql.createConnection({
            host: "localhost", // ✅ Cambiado para que funcione en entorno local
            user: "root",
            password: "",
            database: "estacionamiento", // nombre de la base de datos a la cual te estas conectando
            charset: ""
        });

        return db; // ✅ Corregido: antes retornabas "connection" (variable que no existe)
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        throw error;
    }
}

export default connect;
