const Proyecto = require('../models/Proyecto');

// Middleware para validar que un proyecto exista
const validarProyecto = async (req, res, next) => {
  const { proyectoId } = req.body || req.params;

  try {
    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    // Si el proyecto existe, continúa con la solicitud
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al validar el proyecto' });
  }
};

module.exports = {
  validarProyecto,
};