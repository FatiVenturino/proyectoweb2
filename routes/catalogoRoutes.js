const express = require('express');
const router = express.Router();
const { upload, subirImagen, obtenerImagenes, eliminarImagen } = require('../controllers/catalogoController');

// Ruta para subir una imagen
router.post('/subir-imagen', upload.single('imagen'), subirImagen);

// Ruta para obtener todas las imágenes
router.get('/imagenes', obtenerImagenes);

// Ruta para eliminar una imagen
router.delete('/imagen/:id', eliminarImagen);

module.exports = router; 