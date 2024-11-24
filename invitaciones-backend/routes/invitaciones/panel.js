const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const { graduadoSchema } = require('../../models/Graduado');

// Función para obtener el modelo en la base de datos configurada
const getGraduadoModel = () => {
  const dbName = process.env.DB_NAME || "test"; // Usa la base configurada en .env
  const db = mongoose.connection.useDb(dbName); // Cambia dinámicamente de base
  return db.model("Graduado", graduadoSchema); // Registra el modelo con el esquema
};

// Middleware para verificar el token en las solicitudes
router.use((req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Generar el hash del token proporcionado
  const hashCalculado = crypto.createHash('sha256').update(token).digest('hex');

  // Comparar el hash calculado con el hash válido en el .env
  if (hashCalculado !== process.env.HASH_VALIDO) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  next();
});

// Ruta para obtener la lista de graduados
router.get('/graduados', async (req, res) => {
  try {
    const Graduado = getGraduadoModel();
    const graduados = await Graduado.find().sort({ _id: 1 });
    res.status(200).json(graduados);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener la lista de graduados ${error}` });
  }
});

// Ruta para validar el token
router.get('/validate-token', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  // Generar el hash del token proporcionado
  const hashCalculado = crypto.createHash('sha256').update(token).digest('hex');

  // Comparar el hash calculado con el hash válido en el .env
  if (hashCalculado === process.env.HASH_VALIDO) {
    return res.status(200).json({ mensaje: 'Acceso autorizado' });
  } else {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
});

module.exports = router;