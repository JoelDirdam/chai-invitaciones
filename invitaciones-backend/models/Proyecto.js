const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proyectoSchema = new Schema({
  nombreProyecto: { type: String, required: true },
  identificador: { type: String, required: true },  // Usado en la URL, por ejemplo: "LNIUAT2024"
  descripcion: String,
  creadoPor: { type: String, required: true }, // Admin o Usuario que creó el proyecto
}, { timestamps: true });

const Proyecto = mongoose.model('Proyecto', proyectoSchema);
module.exports = Proyecto;
