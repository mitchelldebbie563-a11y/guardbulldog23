const db = require('../config/db');

const User = {
  async create(user) {
    const { firstName, lastName, email, password, role, department } = user;
    const sql = `INSERT INTO users ("firstName", "lastName", email, password, role, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [firstName, lastName, email, password, role, department];
    const result = await db.query(sql, params);
    return result.rows[0];
  },

  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(sql, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const sql = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  },

  async findFirstUser() {
    const sql = `SELECT * FROM users ORDER BY id ASC LIMIT 1`;
    const result = await db.query(sql);
    return result.rows[0];
  }
};

module.exports = User;
