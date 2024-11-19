const crypto = require('crypto');
require('dotenv').config();

// Middleware para verificar el acceso al panel mediante un hash
function verificarAccesoHash(req, res, next) {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Generar el hash del token proporcionado
  const hashCalculado = crypto.createHash('sha256').update(token).digest('hex');

  // Comparar el hash calculado con el hash válido en el .env
  if (hashCalculado !== process.env.HASH_VALIDO) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  next(); // Permitir el acceso si el hash es válido
}

module.exports = verificarAccesoHash;
