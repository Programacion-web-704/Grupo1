const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

const app = express()
const port = 3080


app.use(bodyParser.json());

const registeredUsers = [];

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { email, password, role } = req.body;

    // Validación básica de campos
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario ya está registrado
    if (registeredUsers.find(user => user.email === email)) {
        return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    const newUser = { email, password, role };
    registeredUsers.push(newUser);

    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por su correo electrónico
    const user = registeredUsers.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Verificar la contraseña
    if (user.password !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso.' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});