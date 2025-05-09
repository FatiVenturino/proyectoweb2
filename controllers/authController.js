const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = (req, res) => {
  const { nombre, email, password, rol } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  Usuario.crear({ nombre, email, password: hash, rol }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ mensaje: 'Usuario registrado con éxito' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  Usuario.buscarPorEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ mensaje: 'Credenciales inválidas' });
    }

    const usuario = results[0];

    if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).send({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ mensaje: 'Login exitoso', token });
  });
};
