const express = require('express');
const router = express.Router();
const Proyecto = require('../../models/Proyecto');

// Crear un nuevo proyecto (por ejemplo, una graduación)
router.post('/crear', async (req, res) => {
  try {
    const { nombreProyecto, identificador, descripcion, creadoPor } = req.body;

    const nuevoProyecto = new Proyecto({
      nombreProyecto,
      identificador,
      descripcion,
      creadoPor
    });

    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// Obtener la lista de todos los proyectos
router.get('/listar', async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
});

module.exports = router;
