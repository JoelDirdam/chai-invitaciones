const express = require('express');
const router = express.Router();
const Graduado = require('../../models/Graduado');

// Obtener información de un invitado específico y del graduado
router.get('/:primerNombre,:primerApellido,:index', async (req, res) => {
  try {
    const { primerNombre, primerApellido, index } = req.params;
    const nombreCompleto = `${primerNombre.trim()} ${primerApellido.trim()}`.toLowerCase();

    // Usar una expresión regular para buscar nombres que contengan tanto el primer nombre como el apellido
    const regex = new RegExp(`${primerNombre.trim()}.*${primerApellido.trim()}`, 'i');
    
    // Buscar el graduado por un nombre que contenga el primer nombre y el apellido
    const graduado = await Graduado.findOne({ nombreCompleto: regex });
    
    if (!graduado) {
      return res.status(404).json({ error: 'Graduado no encontrado' });
    }

    const invitadoIndex = parseInt(index - 1, 10); // Ajuste para que el índice comience en 1

    if (invitadoIndex < 0 || invitadoIndex >= graduado.arrayInvitados.length) {
      return res.status(400).json({ error: 'Índice de invitado no válido' });
    }

    const invitado = graduado.arrayInvitados[invitadoIndex];

    // Enviar la información del graduado y del invitado
    res.json({
      graduado: {
        email: graduado.email,
        nombreCompleto: graduado.nombreCompleto,
        genero: graduado.genero,
        numeroInvitados: graduado.numeroInvitados,
        numeroLista: graduado.numeroLista,
        adicional: graduado.adicional,
        createdAt: graduado.createdAt,
        updatedAt: graduado.updatedAt
      },
      invitado: invitado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el invitado' });
  }
});

// Ruta para actualizar el estado de un invitado específico
router.put('/actualizar-estado/:primerNombre,:primerApellido,:index', async (req, res) => {
  try {
    const { primerNombre, primerApellido, index } = req.params;
    const { nuevoEstado } = req.body; // 'nuevoEstado' se envía en el cuerpo de la petición
    const nombreCompleto = `${primerNombre.trim()} ${primerApellido.trim()}`.toLowerCase();

    // Validar que el estado sea uno de los permitidos
    if (!['pendiente', 'confirmada', 'cancelada'].includes(nuevoEstado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    // Buscar el graduado por nombre completo
    const graduado = await Graduado.findOne({ nombreCompleto: new RegExp(`^${nombreCompleto}$`, 'i') });
    
    if (!graduado) {
      return res.status(404).json({ error: 'Graduado no encontrado' });
    }

    const invitadoIndex = parseInt(index, 10); // No se ajusta el índice, se utiliza tal cual

    if (invitadoIndex < 0 || invitadoIndex >= graduado.arrayInvitados.length) {
      return res.status(400).json({ error: 'Índice de invitado no válido' });
    }

    // Actualizar el estado del invitado
    graduado.arrayInvitados[invitadoIndex].status = nuevoEstado;

    // Guardar los cambios en la base de datos
    await graduado.save();

    res.json({ mensaje: 'Estado del invitado actualizado exitosamente', invitado: graduado.arrayInvitados[invitadoIndex] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del invitado' });
  }
});

module.exports = router;
