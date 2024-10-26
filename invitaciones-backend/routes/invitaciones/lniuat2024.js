const express = require('express');
const router = express.Router();
const Graduado = require('../../models/Graduado');
const { validarProyecto } = require('../../utils/helpers');

// Crear una invitación para LNIUAT2024
router.post('/crear', validarProyecto, async (req, res) => {
  try {
    const { nombre, esFamilia, cantidadInvitados, proyectoId } = req.body;

    const nombreEnlace = nombre.replace(/\s+/g, '').toLowerCase();
    const link = `https://chaimanzana.com/Invitation/Grad/LNIUAT2024/${nombreEnlace}`;

    const nuevoGraduado = new Graduado({
      nombre,
      esFamilia,
      cantidadInvitados,
      link,
      proyecto: proyectoId
    });

    await nuevoGraduado.save();
    res.status(201).json(nuevoGraduado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la invitación' });
  }
});

// Obtener todas las invitaciones de LNIUAT2024
router.get('/listar', validarProyecto, async (req, res) => {
  try {
    const invitaciones = await Graduado.find({ proyecto: req.params.proyectoId });
    res.json(invitaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las invitaciones' });
  }
});

module.exports = router;
