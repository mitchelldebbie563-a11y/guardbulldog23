# 🚀 GUARDBULLDOG Quick Reference Card

## ⚡ Quick Start Commands

```bash
# Setup (First Time)
npm install && cd client && npm install && cd ..
copy .env.example .env
# Edit .env with your database URL
npm run seed

# Development
npm run dev          # Start both server & client
npm run server       # Backend only (port 5000)
npm run client       # Frontend only (port 3000)

# Production
npm start            # Production server
```

---

## 🔑 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@bowie.edu | Admin123! | Super Admin |
| security@bowie.edu | Security123! | Admin |
| student@bowie.edu | Student123! | User |
| faculty@bowie.edu | Faculty123! | User |

---

## 🔌 API Endpoints Cheat Sheet

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login
GET    /api/auth/verify            Verify token
GET    /api/auth/profile           Get profile
PUT    /api/auth/profile           Update profile
PUT    /api/auth/change-password   Change password
```

### Reports
```
POST   /api/reports/submit         Submit report
GET    /api/reports/user           Get my reports
GET    /api/reports/:id            Get report details
GET    /api/reports/trending       Trending threats
PUT    /api/reports/:id/status     Update status (Admin)
POST   /api/reports/:id/notes      Add note (Admin)
```

### Admin
```
GET    /api/admin/dashboard        Dashboard stats
GET    /api/admin/reports          All reports
GET    /api/admin/users            All users
PUT    /api/admin/users/:id/role   Update role
PUT    /api/admin/reports/bulk     Bulk update
GET    /api/admin/system/health    System health
```

---

## 📝 Common Request Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bowie.edu","password":"Admin123!"}'
```

### Submit Report (with token)
```bash
curl -X POST http://localhost:5000/api/reports/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "emailSubject":"Suspicious Email",
    "senderEmail":"phishing@bad.com",
    "emailBody":"Click here now!",
    "reportType":"phishing"
  }'
```

### Get Dashboard Stats (Admin)
```bash
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🗄️ Database Tables

```
users              → User accounts
reports            → Phishing reports
report_notes       → Admin notes
education_modules  → Learning content
user_progress      → Learning tracking
audit_logs         → Activity logs
```

---

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/guardbulldog
JWT_SECRET=your_32_char_secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## 📂 Important Files

```
server/
  ├── index.js              → Server entry
  ├── config/db.js          → Database setup
  ├── controllers/          → Business logic
  ├── routes/               → API routes
  ├── models/               → Data models
  └── middleware/           → Auth & validation

client/src/
  ├── pages/                → Page components
  ├── components/           → Reusable components
  ├── contexts/             → React contexts
  └── utils/api.js          → API client
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Test connection: psql -d guardbulldog
```

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process: netstat -ano | findstr :5000
```

### Module Not Found
```bash
npm install
cd client && npm install
```

### Token Invalid
```bash
# Token expired (7 days)
# Login again to get new token
```

---

## 📊 Status Codes

```
200 OK              → Success
201 Created         → Resource created
400 Bad Request     → Invalid input
401 Unauthorized    → No/invalid token
403 Forbidden       → No permission
404 Not Found       → Resource not found
500 Server Error    → Server problem
```

---

## 🎯 Report Types

- `phishing` - Phishing attempts
- `spam` - Spam emails
- `malware` - Malware threats

## 📈 Report Status

- `pending` - New report
- `investigating` - Under review
- `resolved` - Completed
- `false_positive` - Not a threat

## 👥 User Roles

- `user` - Regular user
- `admin` - Administrator
- `super_admin` - Super administrator

---

## 🔧 Useful Scripts

```bash
npm run seed           # Seed database
npm run dev            # Development mode
npm run server         # Backend only
npm run client         # Frontend only
npm start              # Production
npm run install-all    # Install all deps
```

---

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP_COMPLETE.md** - Setup guide
- **API_TESTING.md** - API examples
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **QUICK_REFERENCE.md** - This file

---

## ✅ Health Check

```bash
curl http://localhost:5000/api/health
# Expected: {"status":"OK","message":"GUARDBULLDOG API is running"}
```

---

## 🚀 Deployment Quick Commands

### Heroku
```bash
heroku create app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret
git push heroku main
heroku run npm run seed
```

---

## 💡 Pro Tips

1. **Always use Bearer tokens**: `Authorization: Bearer TOKEN`
2. **Check server logs** for detailed errors
3. **Use Postman** for API testing
4. **Seed database** after fresh install
5. **Keep JWT_SECRET secure** (32+ characters)
6. **Use HTTPS** in production
7. **Backup database** regularly

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- JWT: https://jwt.io/
- React: https://react.dev/

---

**🎉 You're ready to use GUARDBULLDOG!**

**Need help?** Check the full documentation files listed above.
