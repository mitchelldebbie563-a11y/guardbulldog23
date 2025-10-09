# GUARDBULLDOG: Development Process Overview

This document outlines the major phases of development for the GUARDBULLDOG application, from initial setup to the implementation of advanced features and final professional review.

---

### Phase 1: Backend Foundation & Core API Development

The first phase focused on building a robust and scalable backend to power the application's core functionalities.

1.  **Server & Database Setup:**
    *   A Node.js server was established using the Express.js framework to handle all API requests.
    *   A connection to a MongoDB database was implemented using Mongoose, allowing for structured data storage.

2.  **Data Modeling:**
    *   Core data schemas were defined for `User` (including name, email, password, and role) and `Report` (including user reference, email content, and status), establishing the foundational data structure of the application.

3.  **Authentication & Security:**
    *   A secure user authentication system was built from the ground up, featuring:
        *   **User Registration & Login:** Endpoints for creating new users and authenticating existing ones.
        *   **Password Hashing:** `bcrypt.js` was used to securely hash and store user passwords, ensuring they are never stored in plain text.
        *   **JSON Web Tokens (JWT):** A token-based system was implemented to manage user sessions and protect private routes.

4.  **Role-Based Access Control (RBAC):**
    *   Middleware was created to check user roles (`User`, `Admin`, `Super Admin`), ensuring that sensitive routes and data are only accessible to authorized personnel.

5.  **API Endpoint Development:**
    *   The initial set of API routes for handling authentication (`/api/auth`) and phishing reports (`/api/reports`) was created, providing the necessary interface for the frontend to interact with the backend.

---

### Phase 2: Frontend Implementation & User Interface

This phase involved building the user-facing side of the application using the React.js library, focusing on creating an intuitive and responsive user experience.

1.  **Application Scaffolding:**
    *   A Create React App project was initialized, and the necessary dependencies such as `react-router`, `axios`, and `tailwindcss` were installed.

2.  **Routing & Navigation:**
    *   A comprehensive routing system was set up in `App.js` to manage navigation throughout the application.
    *   This included creating `PublicRoute` and `ProtectedRoute` components to direct users based on their authentication status and role.

3.  **Layout & Core Components:**
    *   A consistent application layout was designed, featuring a `Navbar` for top-level navigation and a `Sidebar` for accessing the main features of the dashboard.

4.  **Page & Feature Development:**
    *   The primary pages of the application were built, including:
        *   A `Dashboard` to serve as the user's central hub.
        *   A `ReportPhishing` form for submitting suspicious emails.
        *   A `MyReports` page for users to view their submission history.
        *   Admin-specific pages for managing users and reports.

---

### Phase 3: Advanced Feature - AI Chatbot Integration

To enhance user support, an AI-powered chatbot was integrated into the application.

1.  **UI/UX Design:**
    *   A non-intrusive `ChatWidget` was designed and placed globally across the site.
    *   An interactive `ChatWindow` was created to display the conversation and handle user input.

2.  **Backend Serverless Function:**
    *   A new serverless function (`/api/chat`) was developed to act as the chatbot's backend.
    *   This function integrates with the **OpenAI API**, sending user messages and conversation history to generate intelligent responses.

3.  **Agent Escalation:**
    *   A key feature was added to allow the AI to recognize when a user needs human assistance. In such cases, the system is designed to escalate the conversation to a live agent.

---

### Phase 4: Professional Review, Refinement & Deployment Readiness

The final phase focused on a comprehensive audit of the entire application to ensure it is professional, error-free, and ready for presentation and deployment.

1.  **Bug Squashing & Link Fixing:**
    *   The application was thoroughly tested to find and fix any broken links or navigational errors, such as the previously non-functional "Super Admin" links.

2.  **Dynamic Data Integration:**
    *   All static, placeholder content on the user dashboard was replaced with live data fetched from newly created API endpoints, ensuring the dashboard is a true reflection of user activity.

3.  **Build & Deployment Verification:**
    *   The production build process was repeatedly run to identify and resolve any underlying errors that would prevent a successful deployment. This included fixing CSS class errors, invalid icon imports, and dependency issues.

4.  **Code Quality & Cleanup:**
    *   The entire codebase was reviewed to remove unused variables and imports.
    *   Accessibility issues were addressed to ensure the application is usable by a wider audience.
    *   The `netlify.toml` file was configured to ensure a smooth and correct deployment process on Netlify.
