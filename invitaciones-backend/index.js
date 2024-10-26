const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const invitacionesRouter = require('./routes/invitaciones');

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas base
app.get('/', (req, res) => {
    res.send('API de invitaciones funcionando');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectando a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use('/invitations', invitacionesRouter);

