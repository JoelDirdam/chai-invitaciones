const mongoose = require("mongoose");

const imagenesSchema = new mongoose.Schema(
  {
    graduado_id: { type: Number, required: true },
    imagen: { type: String, required: true },
    nombre_archivo: { type: String, required: true },
  },
  { collection: "imagenes" } // Nombre de la colección en la base de datos
);

module.exports = {
  schema: imagenesSchema,
  model: mongoose.model("Imagen", imagenesSchema),
};