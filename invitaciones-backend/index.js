const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const invitacionesRouter = require('./routes/invitaciones/lniuat2024');
const panelRouter = require('./routes/invitaciones/panel');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Función para cambiar de base de datos
const changeDatabase = (dbName) => {
    const newDb = mongoose.connection.useDb(dbName);
    console.log(`Conectado a la base de datos: ${dbName}`);
    return newDb;
};

// Conectar a MongoDB y seleccionar la base configurada en .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    const dbName = process.env.DB_NAME || 'test'; // Leer base de datos desde .env
    changeDatabase(dbName); // Cambiar a la base especificada
})
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/invitations/lniuat2024', invitacionesRouter);
app.use('/invitations/lniuat2024/panel', panelRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});