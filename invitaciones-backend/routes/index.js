const express = require('express');
const router = express.Router();
const proyectoRoutes = require('./proyectos/grad');
const invitacionRoutes = require('./invitaciones/lniuat2024');

// Usar las rutas específicas por proyecto o invitación
router.use('/proyecto', proyectoRoutes);
router.use('/invitaciones/lniuat2024', invitacionRoutes);

module.exports = router;
