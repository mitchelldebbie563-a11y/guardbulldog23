# GUARDBULLDOG API Testing Guide

## 🧪 Testing the APIs

Use these examples to test all API endpoints with tools like **Postman**, **Thunder Client**, or **curl**.

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@bowie.edu",
  "password": "SecurePass123!",
  "department": "Computer Science"
}
```

**Expected Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@bowie.edu",
    "role": "user",
    "department": "Computer Science"
  }
}
```

---

### 2. Login

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Body:**
```json
{
  "email": "admin@bowie.edu",
  "password": "Admin123!"
}
```

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@bowie.edu",
    "role": "super_admin",
    "department": "IT Security"
  }
}
```

**💡 Save the token for subsequent requests!**

---

### 3. Verify Token

**Endpoint:** `GET http://localhost:5000/api/auth/verify`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Expected Response (200):**
```json
{
  "user": {
    "id": 1,
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@bowie.edu",
    "role": "super_admin",
    "department": "IT Security"
  }
}
```

---

### 4. Get Profile

**Endpoint:** `GET http://localhost:5000/api/auth/profile`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

---

### 5. Update Profile

**Endpoint:** `PUT http://localhost:5000/api/auth/profile`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Updated",
  "department": "Cybersecurity"
}
```

---

### 6. Change Password

**Endpoint:** `PUT http://localhost:5000/api/auth/change-password`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "currentPassword": "Admin123!",
  "newPassword": "NewSecurePass123!"
}
```

---

## 📧 Reports Endpoints

### 1. Submit Phishing Report

**Endpoint:** `POST http://localhost:5000/api/reports/submit`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "emailSubject": "Urgent: Verify Your Account Now",
  "senderEmail": "noreply@suspicious-site.com",
  "emailBody": "Your account has been compromised. Click here immediately to verify your identity and prevent account closure.",
  "reportType": "phishing",
  "suspiciousLinks": "https://suspicious-site.com/verify"
}
```

**Expected Response (201):**
```json
{
  "message": "Report submitted successfully",
  "report": {
    "id": 4,
    "reportedBy": 1,
    "emailSubject": "Urgent: Verify Your Account Now",
    "senderEmail": "noreply@suspicious-site.com",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get User's Reports

**Endpoint:** `GET http://localhost:5000/api/reports/user`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Query Parameters (Optional):**
- `status` - Filter by status (pending, investigating, resolved, false_positive)
- `reportType` - Filter by type (phishing, spam, malware)
- `limit` - Number of results (default: 50)

**Example:** `GET http://localhost:5000/api/reports/user?status=pending&limit=10`

---

### 3. Get Report by ID

**Endpoint:** `GET http://localhost:5000/api/reports/:id`

**Example:** `GET http://localhost:5000/api/reports/1`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

---

### 4. Get Trending Threats

**Endpoint:** `GET http://localhost:5000/api/reports/trending`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
  "threats": [
    {
      "senderEmail": "noreply@suspicious-bank.com",
      "count": "15"
    },
    {
      "senderEmail": "lottery@fake-lottery.com",
      "count": "8"
    }
  ]
}
```

---

### 5. Update Report Status (Admin Only)

**Endpoint:** `PUT http://localhost:5000/api/reports/:id/status`

**Example:** `PUT http://localhost:5000/api/reports/1/status`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "status": "investigating"
}
```

**Valid Status Values:**
- `pending`
- `investigating`
- `resolved`
- `false_positive`

---

### 6. Add Admin Note (Admin Only)

**Endpoint:** `POST http://localhost:5000/api/reports/:id/notes`

**Example:** `POST http://localhost:5000/api/reports/1/notes`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "note": "Verified as legitimate phishing attempt. Sender domain has been blacklisted."
}
```

---

## 👑 Admin Endpoints

### 1. Get Dashboard Statistics

**Endpoint:** `GET http://localhost:5000/api/admin/dashboard`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
  "stats": {
    "reports": {
      "total": 45,
      "pending": 12,
      "investigating": 8,
      "resolved": 20,
      "falsePositive": 5
    },
    "reportTypes": {
      "phishing": 30,
      "spam": 10,
      "malware": 5
    },
    "users": {
      "total": 150,
      "admins": 5,
      "regularUsers": 145
    }
  }
}
```

---

### 2. Get All Reports (Admin)

**Endpoint:** `GET http://localhost:5000/api/admin/reports`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```

**Query Parameters:**
- `status` - Filter by status
- `reportType` - Filter by type
- `startDate` - Filter from date (ISO format)
- `endDate` - Filter to date (ISO format)
- `limit` - Results per page (default: 100)
- `offset` - Pagination offset (default: 0)

**Example:** `GET http://localhost:5000/api/admin/reports?status=pending&limit=20`

---

### 3. Get All Users (Admin)

**Endpoint:** `GET http://localhost:5000/api/admin/users`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```

**Query Parameters:**
- `role` - Filter by role (user, admin, super_admin)
- `department` - Filter by department

---

### 4. Update User Role (Admin)

**Endpoint:** `PUT http://localhost:5000/api/admin/users/:userId/role`

**Example:** `PUT http://localhost:5000/api/admin/users/5/role`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "role": "admin"
}
```

**Valid Roles:**
- `user`
- `admin`
- `super_admin`

---

### 5. Bulk Update Reports (Admin)

**Endpoint:** `PUT http://localhost:5000/api/admin/reports/bulk`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "reportIds": [1, 2, 3, 4],
  "updates": {
    "status": "resolved"
  }
}
```

---

### 6. Get System Health (Admin)

**Endpoint:** `GET http://localhost:5000/api/admin/system/health`

**Headers:**
```json
{
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
  "health": {
    "status": "operational",
    "database": "healthy",
    "uptime": 3600.5,
    "memory": {
      "rss": 52428800,
      "heapTotal": 20971520,
      "heapUsed": 15728640
    },
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🧪 Testing Workflow

### Complete Test Sequence:

1. **Register a new user** → Save token
2. **Login with demo account** → Save admin token
3. **Verify token** → Confirm authentication
4. **Submit a report** → Get report ID
5. **Get user's reports** → Verify report appears
6. **Get report by ID** → Check details
7. **Update report status** (as admin) → Change to investigating
8. **Add admin note** → Add investigation notes
9. **Get dashboard stats** (as admin) → View statistics
10. **Get trending threats** → See patterns

---

## 📝 Notes

- All authenticated endpoints require the `Authorization: Bearer TOKEN` header
- Admin endpoints require a token from a user with `admin` or `super_admin` role
- Tokens expire after 7 days (configurable in JWT_EXPIRE env variable)
- File uploads use `multipart/form-data` content type
- Maximum file size is 10MB per file, 5 files per report

---

## 🐛 Common Errors

### 401 Unauthorized
- Token is missing or invalid
- Token has expired
- Wrong authorization header format

### 403 Forbidden
- User doesn't have required permissions
- Trying to access admin endpoint without admin role

### 400 Bad Request
- Missing required fields
- Invalid data format
- Validation errors

### 404 Not Found
- Resource doesn't exist
- Wrong endpoint URL

### 500 Server Error
- Database connection issue
- Server configuration problem
- Check server logs for details

---

**✅ All endpoints are now fully functional and ready for testing!**
