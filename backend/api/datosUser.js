const express = require('express');
const db = require('../db/models/index');

const ruta = express.Router();

ruta.put('/updateAdmin/:username', async (req, res) => {
  try {
    const { newPassword, newRole } = req.body;
    const username = req.params.username;

    const admin = await db.Admin.findOne({
      where: { Username: username },
    });

    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado.' });
    }

    // Actualizar la contraseña si se proporciona
    if (newPassword) {
      admin.Password = newPassword;
    }

    // Actualizar el rol si se proporciona
    if (newRole) {
      admin.Role = newRole;
    }

    await admin.save();

    res.json({ message: 'Datos de administrador actualizados exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar datos del administrador:', error);
    res.status(500).json({ error: 'Error al actualizar datos del administrador.' });
  }
});

ruta.put('/updateUser/:username', async (req, res) => {
  try {
    const { newNombre, newApellidos, newTipoDoc, newNroDoc } = req.body;
    const username = req.params.username;

    const user = await db.User.findOne({
      where: { Username: username },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Actualizar el nombre si se proporciona
    if (newNombre) {
      user.Nombre = newNombre;
    }

    // Actualizar los apellidos si se proporcionan
    if (newApellidos) {
      user.Apellidos = newApellidos;
    }

    // Actualizar el tipo de documento si se proporciona
    if (newTipoDoc) {
      user.TipoDoc = newTipoDoc;
    }

    // Actualizar el número de documento si se proporciona
    if (newNroDoc) {
      user.NroDoc = newNroDoc;
    }

    await user.save();

    res.json({ message: 'Datos de usuario actualizados exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar datos del usuario:', error);
    res.status(500).json({ error: 'Error al actualizar datos del usuario.' });
  }
});

module.exports = ruta;
