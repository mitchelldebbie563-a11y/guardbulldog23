const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        department VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        "reportedBy" INTEGER,
        "emailSubject" TEXT,
        "senderEmail" VARCHAR(255),
        "reportType" VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("reportedBy") REFERENCES users (id) ON DELETE SET NULL
      );
    `);
    console.log('Tables are successfully created or already exist.');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.release();
  }
};

// Initialize tables on startup
createTables();

module.exports = {
  query: (text, params) => pool.query(text, params),
};