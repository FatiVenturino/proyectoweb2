const express = require('express');
const router = express.Router();
const { loginAdmin, verificarToken } = require('../controllers/adminController');

// Ruta para login de administrador
router.post('/login', loginAdmin);

module.exports = {
    router,
    verificarToken
}; 