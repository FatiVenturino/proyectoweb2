const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const loginAdmin = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar el administrador en la base de datos
        const [admin] = await pool.query(
            'SELECT * FROM administradores WHERE usuario = ?',
            [usuario]
        );

        if (admin.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, admin[0].password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: admin[0].id, usuario: admin[0].usuario },
            process.env.JWT_SECRET || 'tu_clave_secreta',
            { expiresIn: '1h' }
        );

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: admin[0].usuario
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = {
    loginAdmin,
    verificarToken
}; 