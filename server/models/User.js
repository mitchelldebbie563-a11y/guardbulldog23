const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const { firstName, lastName, email, password, role, department } = user;
    const sql = `INSERT INTO users (firstName, lastName, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [firstName, lastName, email, password, role, department], function(err) {
      callback(err, { id: this.lastID });
    });
  },

  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
      callback(err, row);
    });
  },

  findById: (id, callback) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  }
};

module.exports = User;
