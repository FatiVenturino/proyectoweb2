const db = require('./db');

const Usuario = {
  crear: (usuario, callback) => {
    const sql = 'INSERT INTO usuarios SET ?';
    db.query(sql, usuario, callback);
  },
  
  buscarPorEmail: (email, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], callback);
  }
};

module.exports = Usuario;
