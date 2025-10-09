# System Specifications

This document outlines the detailed functional and non-functional requirements for the GUARDBULLDOG system.

## Functional Requirements

1.  **User Authentication**
    *   Support for campus SSO (SAML/OIDC) as the primary authentication method.
    *   A fallback email/password login for guest reporters or local admins.
    *   Strict Role-Based Access Control (RBAC) for the following roles: Reporter, Analyst, Admin, Trainer.

2.  **Phishing Reporting**
    *   Multiple submission channels: a web form, a dedicated forward-to email alias (e.g., `report@guardbulldog.bowie.edu`), and an optional browser plugin.
    *   Support for various attachment types, including `.eml`, `.msg`, `.pdf`, and image files (screenshots).
    *   Automatic parsing of email headers and metadata from forwarded or uploaded email files.

3.  **Triage & Workflow**
    *   A dedicated analyst queue with features to assign or claim incidents.
    *   Functionality for analysts to add comments, apply tags (e.g., TTPs), and set a final disposition.
    *   Full incident lifecycle management (New, In Progress, Escalated, Resolved, False Positive) with automated notifications to the reporter.

4.  **Learning & Awareness**
    *   A library of microlearning modules with embedded quizzes.
    *   Detailed progress tracking for each user.
    *   Generation of completion certificates (PDF).
    *   Ability for Admins or Trainers to assign mandatory training to specific user groups.

5.  **Analytics & Reporting**
    *   Interactive dashboards displaying key metrics: incidents over time, top phishing types, user training completion rates, and time-to-resolution.
    *   Ability to export reports and dashboard data to CSV and PDF formats.

6.  **Integrations**
    *   API-based connectors for SIEM/EDR (for escalating IOCs), identity management (Azure AD for password resets), email gateways (for blocking senders), and ticketing systems (Jira/ServiceNow).

7.  **Security & Compliance**
    *   Encryption-in-transit (TLS 1.3) and encryption-at-rest (AES-256) for all sensitive data.
    *   Detailed audit logging of all user and admin actions.
    *   Configurable data retention policies.
    *   Strict data privacy controls, including the scoping of Personally Identifiable Information (PII) and FERPA-conscious handling of student data.

8.  **Notifications**
    *   Multi-channel notifications via email and optional integrations with SMS gateways or MS Teams/Slack for report acknowledgements, escalations, and training reminders.

## Non-functional Requirements

*   **Availability**: `99.9%` SLA for core reporting and triage features.
*   **Performance**: Report submission acknowledgment must be `< 5 seconds` under peak load. Dashboard queries must render in `< 2 seconds` for typical filters.
*   **Scalability**: The system must be architected to handle 100,000+ users and simultaneous report submissions. Backend services should be designed for auto-scaling.
*   **Security**: The application must be hardened against the OWASP Top 10. Regular vulnerability scanning is required. Multi-Factor Authentication (2FA) is mandatory for all admin roles.
*   **Retention & Audit**: Data retention periods must be configurable (e.g., 1–7 years). Audit logs must be immutable.
*   **Localization**: The interface must be built with internationalization (i18n) support, with English as the default language.
*   **Accessibility**: The entire user-facing application must be compliant with WCAG 2.1 AA standards.
*   **Backup & Recovery**: Nightly database backups are required. Restore procedures must be tested regularly. The Recovery Time Objective (RTO) must be `< 4 hours`, and the Recovery Point Objective (RPO) must be `< 1 hour`.
