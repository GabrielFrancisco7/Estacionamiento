


import express from "express";

//manejador de base de datos o archivo que se encarga de comunicarse con la base de datos
import UsuarioService from "../services/usuario.service.mjs";

const router = express.Router();

//req - de aquí obtienes los parametros que te envia el usuario
//res - aqui se encuentran los métodos para regresar informacion o responder
//next - llama el siguiente proceso, aqui se usa para devolver errores y pasarlos a error handler

//
function login(req, res, next) {
    const {usuario, contrasenia} = req.body;
    UsuarioService.buscarUsuario(usuario, contrasenia)
        .then((resp) => {
            if (resp.length == 1) {
                res.status(200).json({ mensaje: "Acceso concedido", id: resp[0].id});
            } 
            else {
                res.status(400).json({ mensaje: "Usuario o Contraseña incorrecta"});
            }
        })
        .catch((err) => next(err));
}

function obtenerRegistros(req, res, next) {
    UsuarioService.obtenerRegistros()
    .then((registros) => res.json(registros))
    .catch((err) => next(err));
}

function crearRegistro(req, res, next) {
    const { nombre } = req.body;

    UsuarioService.crearRegistro(nombre)
        .then(() => {
            res.status(201).json({ mensaje: "Usuario registrado correctamente." });
        })
        .catch((err) => next(err));
}


router.get("/", obtenerRegistros);
router.post("/login", login);
router.post("/", crearRegistro);

export default router;