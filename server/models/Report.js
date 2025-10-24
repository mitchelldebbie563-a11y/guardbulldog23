const db = require('../config/db');

const Report = {
  async create(report) {
    const { reportedBy, emailSubject, senderEmail, emailBody, reportType, suspiciousLinks, attachments } = report;
    const sql = `
      INSERT INTO reports 
      ("reportedBy", "emailSubject", "senderEmail", "emailBody", "reportType", "suspiciousLinks", attachments, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `;
    const params = [reportedBy, emailSubject, senderEmail, emailBody, reportType, suspiciousLinks, attachments, 'pending'];
    const result = await db.query(sql, params);
    return result.rows[0];
  },

  async findById(id) {
    const sql = `
      SELECT r.*, 
             u."firstName", u."lastName", u.email as "reporterEmail"
      FROM reports r
      LEFT JOIN users u ON r."reportedBy" = u.id
      WHERE r.id = $1
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  },

  async findByUserId(userId, filters = {}) {
    let sql = `
      SELECT r.*, u."firstName", u."lastName"
      FROM reports r
      LEFT JOIN users u ON r."reportedBy" = u.id
      WHERE r."reportedBy" = $1
    `;
    const params = [userId];

    if (filters.status) {
      params.push(filters.status);
      sql += ` AND r.status = $${params.length}`;
    }

    if (filters.reportType) {
      params.push(filters.reportType);
      sql += ` AND r."reportType" = $${params.length}`;
    }

    sql += ` ORDER BY r."createdAt" DESC`;

    if (filters.limit) {
      params.push(filters.limit);
      sql += ` LIMIT $${params.length}`;
    }

    const result = await db.query(sql, params);
    return result.rows;
  },

  async findAll(filters = {}) {
    let sql = `
      SELECT r.*, 
             u."firstName", u."lastName", u.email as "reporterEmail"
      FROM reports r
      LEFT JOIN users u ON r."reportedBy" = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      params.push(filters.status);
      sql += ` AND r.status = $${params.length}`;
    }

    if (filters.reportType) {
      params.push(filters.reportType);
      sql += ` AND r."reportType" = $${params.length}`;
    }

    if (filters.startDate) {
      params.push(filters.startDate);
      sql += ` AND r."createdAt" >= $${params.length}`;
    }

    if (filters.endDate) {
      params.push(filters.endDate);
      sql += ` AND r."createdAt" <= $${params.length}`;
    }

    sql += ` ORDER BY r."createdAt" DESC`;

    if (filters.limit) {
      params.push(filters.limit);
      sql += ` LIMIT $${params.length}`;
    }

    if (filters.offset) {
      params.push(filters.offset);
      sql += ` OFFSET $${params.length}`;
    }

    const result = await db.query(sql, params);
    return result.rows;
  },

  async updateStatus(id, status, updatedBy) {
    const sql = `
      UPDATE reports 
      SET status = $1, "updatedBy" = $2, "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await db.query(sql, [status, updatedBy, id]);
    return result.rows[0];
  },

  async addNote(reportId, note, addedBy) {
    const sql = `
      INSERT INTO report_notes ("reportId", note, "addedBy")
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(sql, [reportId, note, addedBy]);
    return result.rows[0];
  },

  async getNotes(reportId) {
    const sql = `
      SELECT rn.*, u."firstName", u."lastName"
      FROM report_notes rn
      LEFT JOIN users u ON rn."addedBy" = u.id
      WHERE rn."reportId" = $1
      ORDER BY rn."createdAt" DESC
    `;
    const result = await db.query(sql, [reportId]);
    return result.rows;
  },

  async count(filters = {}) {
    let sql = `SELECT COUNT(*) FROM reports WHERE 1=1`;
    const params = [];

    if (filters.status) {
      params.push(filters.status);
      sql += ` AND status = $${params.length}`;
    }

    if (filters.reportType) {
      params.push(filters.reportType);
      sql += ` AND "reportType" = $${params.length}`;
    }

    if (filters.reportedBy) {
      params.push(filters.reportedBy);
      sql += ` AND "reportedBy" = $${params.length}`;
    }

    const result = await db.query(sql, params);
    return parseInt(result.rows[0].count);
  },

  async getStats() {
    const sql = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'investigating' THEN 1 END) as investigating,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
        COUNT(CASE WHEN status = 'false_positive' THEN 1 END) as false_positive,
        COUNT(CASE WHEN "reportType" = 'phishing' THEN 1 END) as phishing,
        COUNT(CASE WHEN "reportType" = 'spam' THEN 1 END) as spam,
        COUNT(CASE WHEN "reportType" = 'malware' THEN 1 END) as malware
      FROM reports
    `;
    const result = await db.query(sql);
    return result.rows[0];
  },

  async getTrending(limit = 10) {
    const sql = `
      SELECT "senderEmail", COUNT(*) as count
      FROM reports
      WHERE "createdAt" >= NOW() - INTERVAL '30 days'
      GROUP BY "senderEmail"
      ORDER BY count DESC
      LIMIT $1
    `;
    const result = await db.query(sql, [limit]);
    return result.rows;
  }
};

module.exports = Report;
