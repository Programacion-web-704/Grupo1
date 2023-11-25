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


// Ruta para modificar datos
// Ruta para actualizar los datos de un usuario
app.put('/api/datosUser', (req, res) => {
    const userEmail = req.params.email;
    const { newPassword, newRole } = req.body;

    // Buscar al usuario por su correo electrónico
    const userIndex = registeredUsers.findIndex(user => user.email === userEmail);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Actualizar la contraseña si se proporciona
    if (newPassword) {
        registeredUsers[userIndex].password = newPassword;
    }

    // Actualizar el rol si se proporciona
    if (newRole) {
        registeredUsers[userIndex].role = newRole;
    }

    return res.status(200).json({ message: 'Datos de usuario actualizados exitosamente.' });
});

app.put('/api/datosAdmin', (req, res) => {
    const adminEmail = req.params.email;
    const { newPassword, newRole } = req.body;

    // Buscar al administrador por su correo electrónico
    const adminIndex = registeredAdmins.findIndex(admin => admin.email === adminEmail);

    if (adminIndex === -1) {
        return res.status(404).json({ error: 'Administrador no encontrado.' });
    }

    // Actualizar la contraseña si se proporciona
    if (newPassword) {
        registeredAdmins[adminIndex].password = newPassword;
    }


    return res.status(200).json({ message: 'Datos de administrador actualizados exitosamente.' });
});
