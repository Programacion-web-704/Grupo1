const express = require('express');
const db = require('../db/models/index');

const ruta = express.Router();

ruta.put('/update/:username', async (req, res) => {
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

module.exports = ruta;
