# System Requirements Specification

This document outlines the functional and non-functional requirements for the GUARDBULLDOG platform.

## 1. Functional Requirements

### 1.1 User Management
- **FR1.1.1 - User Registration:** Users (students, faculty, staff) shall be able to create an account.
- **FR1.1.2 - User Authentication:** Registered users shall be able to log in and log out securely.
- **FR1.1.3 - Role-Based Access Control (RBAC):** The system will support 'Admin' and 'User' roles with different permission levels.

### 1.2 Phishing Report Submission
- **FR1.2.1 - Report Form:** Users shall be able to report suspicious emails through a dedicated form.
- **FR1.2.2 - Content Submission:** The form will allow users to paste email content/headers or upload `.eml` files.
- **FR1.2.3 - Submission Confirmation:** Users will receive a confirmation notification upon successful submission.

### 1.3 Incident Management (Admin Dashboard)
- **FR1.3.1 - View Reports:** Admins shall be able to view all user-submitted reports in a central dashboard.
- **FR1.3.2 - Incident Tracking:** Admins can track incidents by status (e.g., 'New', 'In-Progress', 'Resolved').
- **FR1.3.3 - Analytics:** The dashboard will display key metrics like report volume and common threat types.

### 1.4 Educational Content
- **FR1.4.1 - Content Repository:** The platform will host educational materials (articles, quizzes) about phishing.
- **FR1.4.2 - Content Management:** Admins shall be able to add, edit, and delete educational content.

## 2. Non-Functional Requirements

### 2.1 Security
- **NFR2.1.1 - Authentication:** System will use JWT-based authentication.
- **NFR2.1.2 - Data Encryption:** All user passwords and sensitive data will be encrypted.
- **NFR2.1.3 - Input Validation:** All user input will be validated and sanitized to prevent injection attacks.

### 2.2 Performance
- **NFR2.2.1 - Response Time:** The application's user interface must be responsive, with critical interactions completing in under 3 seconds.
- **NFR2.2.2 - Concurrency:** The system must support at least 100 concurrent users without performance degradation.

### 2.3 Usability
- **NFR2.3.1 - Interface:** The user interface must be intuitive and accessible.
- **NFR2.3.2 - Reporting Flow:** The process for reporting an email should be simple and take fewer than 3 steps.

### 2.4 Reliability
- **NFR2.4.1 - Availability:** The system shall have an uptime of 99.5%.
