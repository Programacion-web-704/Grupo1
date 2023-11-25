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
    const { email, password, role } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO users(email, password, role) VALUES($1, $2, $3) RETURNING *',
            [email, password, role]
        );

        const newUser = result.rows[0];
        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;
