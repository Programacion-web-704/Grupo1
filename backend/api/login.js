const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'base3',
    password: '12345678',
    port: 3080,
});


client.connect();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;
