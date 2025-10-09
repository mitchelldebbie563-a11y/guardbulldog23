const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, role, department, external_id }) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO "User" (name, email, password, role, department, external_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, name, email, role, department;
    `;
    const values = [name, email, hashedPassword, role, department, external_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM "User" WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT user_id, name, email, role, department, last_login FROM "User" WHERE user_id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async updateLastLogin(id) {
    const query = 'UPDATE "User" SET last_login = NOW() WHERE user_id = $1';
    await db.query(query, [id]);
  }
}

module.exports = User;
