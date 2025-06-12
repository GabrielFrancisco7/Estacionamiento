// este controlador obtiene los datos que te envia el cliente 
// asi como los datos o las funciones para regresarle informacion
//librerias
import express from "express";

//manejador de base de datos o archivo que se encarga de comunicarse con la base de datos
import ClienteService from "../services/cliente.service.mjs"; 

const router = express.Router();

//req - de aqui obtienes las parametros que te envia el usuario
//res - aqui se encuentran los metodos para regresar infromacion o responder
//next - llama el siguiente proceso, aqui se usa para devolver errores y pasarselos a error handler

function obtenerRegistros(req, res, next) {
    ClienteService.obtenerRegistros()
        .then((registros) => res.json(registros))
        .catch((err) => {
            console.log(err)
            next(err)
        });
}

function crearRegistros(req, res, next) {
    const { placa, duenio, lugar, tipoVehiculo, color, horaentrada, horasalida} = req.body;

    ClienteService.crearRegistro(placa, duenio, lugar, tipoVehiculo, color, horaentrada, horasalida)
        .then(() => {
            res.status(201).json({ mensaje: "Cliente registrado correctamente." });
        })
        .catch((err) => next(err));
}

function registrarSalida(req, res, next) {
    const { id, horasalida, monto } = req.body;

    if (!id || !horasalida || !monto) {
        return res.status(400).json({ error: "Faltan datos necesarios para registrar la salida." });
    }

    ClienteService.registrarSalida(id, horasalida, monto)
        .then(() => {
            res.status(200).json({ mensaje: "Salida registrada correctamente." });
        })
        .catch((err) => {
            console.log("Error al registrar salida:", err);
            next(err);
        });
}

function editarRegistros(req, res, next) {
    const { id, nombre } = req.body;

    ClienteService.editarRegistro(id, nombre)
        .then(() => {
            res.status(200).json({ mensaje: "Cliente editado correctamente." });
        })
        .catch((err) => next(err));
}

function eliminarRegistros(req, res, next) {
    const { id } = req.params;

    ClienteService.eliminarRegistro(id)
        .then(() => {
            res.status(200).json({ mensaje: "Cliente eliminado correctamente." });
        })
        .catch((err) => next(err));
}

router.get("/", obtenerRegistros);
router.post("/", crearRegistros);
router.patch("/salida", registrarSalida); // ✅ Ruta añadida correctamente
router.put("/", editarRegistros);
router.delete("/:id", eliminarRegistros);

export default router;
