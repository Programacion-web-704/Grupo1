const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');
const { Client } = require('pg');
const registerRoute = require('./api/register');
const loginRoute = require('./api/login');

const app = express()
const port = 3080

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'base3',
    password: '12345678',
    port: 3080,
});

client.connect();

// Rutas
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ${port}');
});