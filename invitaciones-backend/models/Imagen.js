const mongoose = require("mongoose");

// Definición del esquema para la colección de imágenes
const imagenesSchema = new mongoose.Schema(
  {
    graduado_id: { type: Number, required: true },
    imagen: { type: String, required: true },
    nombre_archivo: { type: String, required: true },
  },
  { collection: "imagenes" } // Nombre de la colección en la base de datos
);

// Exporta el modelo de imágenes
module.exports = mongoose.model("Imagen", imagenesSchema);