const express = require('express');
const router = express.Router();
const Graduado = require('../../models/Graduado');

// Obtener información de un invitado específico
router.get('/:primerNombre,:primerApellido,:index', async (req, res) => {
  try {
    const { primerNombre, primerApellido, index } = req.params;
    const nombreCompleto = `${primerNombre.trim()} ${primerApellido.trim()}`.toLowerCase();

    // Buscar el graduado por nombre completo
    const graduado = await Graduado.findOne({ nombreCompleto: new RegExp(`^${nombreCompleto}$`, 'i') });
    
    if (!graduado) {
      return res.status(404).json({ error: 'Graduado no encontrado' });
    }

    const invitadoIndex = parseInt(index, 10);

    if (invitadoIndex < 0 || invitadoIndex >= graduado.arrayInvitados.length) {
      return res.status(400).json({ error: 'Índice de invitado no válido' });
    }

    const invitado = graduado.arrayInvitados[invitadoIndex];
    res.json(invitado);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el invitado' });
  }
});

module.exports = router;