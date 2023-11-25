const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

const app = express()
const port = 3080


app.use(bodyParser.json());

const registeredUsers = [];

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { email, password} = req.body;

    // Validación básica de campos
    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario ya está registrado
    if (registeredUsers.find(user => user.email === email)) {
        return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    const newUser = { email, password };
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
