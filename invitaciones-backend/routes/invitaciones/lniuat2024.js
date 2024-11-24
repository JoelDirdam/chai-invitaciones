const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { graduadoSchema } = require("../../models/Graduado"); // Importa solo el esquema

// Función para obtener el modelo en la base de datos configurada
const getGraduadoModel = () => {
  const dbName = process.env.DB_NAME || "test"; // Usa la base configurada en .env
  const db = mongoose.connection.useDb(dbName); // Cambia dinámicamente de base
  return db.model("Graduado", graduadoSchema); // Registra el modelo con el esquema
};

// Obtener información de un invitado específico y del graduado
router.get("/:primerNombre,:primerApellido,:index", async (req, res) => {
  try {
    const { primerNombre, primerApellido, index } = req.params;
    const Graduado = getGraduadoModel(); // Obtén el modelo desde la base de datos correcta

    const regex = new RegExp(
      `${primerNombre.trim()}.*${primerApellido.trim()}`,
      "i"
    );
    const graduado = await Graduado.findOne({ nombreCompleto: regex });

    if (!graduado) {
      return res.status(404).json({ error: "Graduado no encontrado" });
    }

    const invitadoIndex = parseInt(index - 1, 10);
    if (invitadoIndex < 0 || invitadoIndex >= graduado.arrayInvitados.length) {
      return res.status(400).json({ error: "Índice de invitado no válido" });
    }

    const invitado = graduado.arrayInvitados[invitadoIndex];
    res.json({
      graduado: {
        id: graduado._id,
        email: graduado.email,
        nombreCompleto: graduado.nombreCompleto,
        genero: graduado.genero,
        numeroInvitados: graduado.numeroInvitados,
        numeroLista: graduado.numeroLista,
        adicional: graduado.adicional,
        imagenes: graduado.imagenes,
        updatedAt: graduado.updatedAt,
      },
      invitado: invitado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al buscar el invitado: ${error.message}` });
  }
});

// Ruta para actualizar el estado de un invitado específico y la cantidad de pases
router.put(
  "/actualizar-estado/:primerNombre,:primerApellido,:index",
  async (req, res) => {
    try {
      const { primerNombre, primerApellido, index } = req.params;
      const { nuevoEstado, cantidadPasesInd } = req.body;
      const nombreCompleto =
        `${primerNombre.trim()} ${primerApellido.trim()}`.toLowerCase();

      if (!["confirmada", "cancelada"].includes(nuevoEstado)) {
        return res.status(400).json({ error: "Estado no válido" });
      }

      const Graduado = getGraduadoModel(); // Obtén el modelo desde la base de datos correcta

      const regex = new RegExp(
        `${primerNombre.trim()}.*${primerApellido.trim()}`,
        "i"
      );
      const graduado = await Graduado.findOne({ nombreCompleto: regex });

      if (!graduado) {
        return res.status(404).json({ error: "Graduado no encontrado" });
      }

      const invitadoIndex = parseInt(index - 1, 10);

      if (
        invitadoIndex < 0 ||
        invitadoIndex >= graduado.arrayInvitados.length
      ) {
        return res.status(400).json({ error: "Índice de invitado no válido" });
      }

      graduado.arrayInvitados[invitadoIndex].status = nuevoEstado;
      graduado.arrayInvitados[invitadoIndex].cantidadPasesInd =
        cantidadPasesInd;

      await graduado.save();

      res.json({
        mensaje: "Estado y cantidad de pases actualizados exitosamente",
        invitado: graduado.arrayInvitados[invitadoIndex],
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar el estado del invitado" });
    }
  }
);

module.exports = router;
