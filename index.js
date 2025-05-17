const authRoutes = require('./routes/authRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const { router: adminRoutes, verificarToken } = require('./routes/adminRoutes');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Rutas protegidas
app.use('/api/catalogo', verificarToken, catalogoRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

