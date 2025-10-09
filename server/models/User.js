const db = require('../config/db');

const User = {
  create: (user) => {
    return new Promise((resolve, reject) => {
      const { firstName, lastName, email, password, role, department } = user;
      const sql = `INSERT INTO users (firstName, lastName, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)`;
      db.run(sql, [firstName, lastName, email, password, role, department], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID });
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email = ?`;
      db.get(sql, [email], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  findFirstUser: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users ORDER BY id ASC LIMIT 1`;
      db.get(sql, [], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }
};

module.exports = User;
