const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitadoSchema = new Schema({
  nombre: { type: String, required: true }, // Nombre del invitado
  cantidadPases: { type: Number, required: true }, // Número de pases asignados
  status: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }, // Estado de confirmación
  cantidadPasesInd: { type: Number, required: false, default: 0 }, // Numero de pases indicados por el usuario
});

const graduadoSchema = new Schema(
  {
    _id: { type: Number, required: true }, // ID manual para comenzar desde 1
    email: { type: String, required: true }, // Email del graduado
    nombreCompleto: { type: String, required: true }, // Nombre completo del graduado
    genero: { type: String, enum: ['masculino', 'femenino'], default: 'femenino' }, // Género del graduado
    numeroInvitados: { type: Number, required: true }, // Número total de invitados permitidos
    arrayInvitados: { type: [invitadoSchema], required: true }, // Lista de invitados
    numeroLista: { type: Number, required: true }, // Número de lista personalizado
    adicional: { type: String, default: '' }, // Campo adicional que puede ser un string vacío
    imagenes: { type: [String], default: [] }, // Array de imágenes en base64
  },
  { timestamps: true }
);

// Exporta el esquema y el modelo
module.exports = {
  graduadoSchema,
  Graduado: mongoose.model('Graduado', graduadoSchema),
};