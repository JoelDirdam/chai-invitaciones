const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitadoSchema = new Schema({
  nombre: { type: String, required: true }, // Nombre del invitado
  cantidadPases: { type: Number, required: true }, // Número de pases asignados
  status: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' } // Estado de confirmación
});

const graduadoSchema = new Schema({
  email: { type: String, required: true }, // Email del graduado
  nombreCompleto: { type: String, required: true }, // Nombre completo del graduado
  numeroInvitados: { type: Number, required: true }, // Número total de invitados permitidos
  arrayInvitados: { type: [invitadoSchema], required: true }, // Lista de invitados
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto', required: true } // Referencia al proyecto
}, { timestamps: true });

const Graduado = mongoose.model('Graduado', graduadoSchema);
module.exports = Graduado;