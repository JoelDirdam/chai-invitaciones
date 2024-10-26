const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const graduadoSchema = new Schema({
  nombre: { type: String, required: true },
  esFamilia: { type: Boolean, default: false },
  cantidadInvitados: { type: Number, required: true },
  confirmados: { type: Number, default: 0 },
  link: { type: String, required: true }, // URL única para la invitación
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto', required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
}, { timestamps: true });

const Graduado = mongoose.model('Graduado', graduadoSchema);
module.exports = Graduado;
