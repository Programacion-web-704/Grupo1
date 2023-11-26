const express = require('express');
const db = require('../db/models/index');
const ruta = express.Router();

ruta.post('/', async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        // Buscar el usuario en la base de datos con carga de asociación
        const logUser = await db.usuarios.findOne({
            where: {
                correo: usuario,
                contrasena: contraseña,
            },
        });

        if (logUser) {
            // Usuario encontrado, devolver la información
            return res.status(200).json(usuarioEncontrado).end();
        } else {
            // Usuario no encontrado, devolver un error 401
            return res.status(401).end();
        }
    } catch (error) {
        console.error("Error en la verificación de credenciales:", error);
        return res.status(500).json({ error: "Hubo un error en el servidor." }).end();
    }
});

module.exports = ruta;