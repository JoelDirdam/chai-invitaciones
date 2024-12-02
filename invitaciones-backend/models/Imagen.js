const mongoose = require("mongoose");

const imagenesSchema = new mongoose.Schema(
  {
    graduado_id: { type: Number, required: true },
    imagen: { type: String, required: true },
    nombre_archivo: { type: String, required: true },
  },
  { collection: "imagenes" } // Nombre de la colección en la base de datos
);

// Exporta el esquema y el modelo
module.exports = {
  imagenesSchema,
  model: mongoose.model("Imagen", imagenesSchema),
};