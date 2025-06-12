// cliente_service.mjs

import connect from "../middlewares/db.mjs";

async function obtenerRegistros() {
  const db = await connect();

  try {
    const [rows] = await db.execute("SELECT * FROM cliente");
    return Promise.resolve(rows);
  } catch (error) {
    console.log("Error al obtener registros:", error);
    return Promise.reject("Ocurrió un error al intentar obtener los datos");
  } finally {
    db.end();
  }
}

async function registrarSalida(id, horasalida, monto) {
  const db = await connect();

  try {
    const [result] = await db.execute(
      "UPDATE cliente SET hora_salida = ?, monto = ? WHERE id = ?",
      [horasalida, monto, id]
    );
    return Promise.resolve("OK");
  } catch (error) {
    console.log("Error al registrar salida:", error);
    return Promise.reject("Error al registrar salida");
  } finally {
    db.end();
  }
}


async function crearRegistro(placa, duenio, lugar, tipovehiculo, color, horaentrada, horasalida) {
  const db = await connect();

  try {
    const [result] = await db.execute(
      `INSERT INTO cliente (placa, duenio, lugar, tipo_vehiculo, color, hora_entrada, hora_salida)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [placa, duenio, lugar, tipovehiculo, color, horaentrada, horasalida]
    );

    console.log("Insertado correctamente:", result);
    return Promise.resolve("OK");
  } catch (error) {
    console.log("Error al insertar:", error);
    return Promise.reject("Ocurrió un error al intentar agregar registros");
  } finally {
    db.end();
  }
}

async function editarRegistro(id, nombre) {
  const db = await connect();

  try {
    const [result] = await db.execute("UPDATE cliente SET nombre = ? WHERE id = ?", [nombre, id]);
    return Promise.resolve("OK");
  } catch (error) {
    console.log("Error al editar:", error);
    return Promise.reject("Ocurrió un error al intentar editar registros");
  } finally {
    db.end();
  }
}

async function eliminarRegistro(id) {
  const db = await connect();

  try {
    const [result] = await db.execute("DELETE FROM cliente WHERE id = ?", [id]);
    return Promise.resolve("OK");
  } catch (error) {
    console.log("Error al eliminar:", error);
    return Promise.reject("Ocurrió un error al intentar eliminar registros");
  } finally {
    db.end();
  }
}

export default {
  obtenerRegistros,
  crearRegistro,
  editarRegistro,
  eliminarRegistro,
  registrarSalida
}
