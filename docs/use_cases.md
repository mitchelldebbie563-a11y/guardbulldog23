# Use Case Scenarios

This document outlines key user interactions with the GUARDBULLDOG system, detailing the flows, conditions, and criteria for success.

## Use Case 1: Complete Awareness Module & Quiz

*   **Actor(s)**: Student or Staff (Learner)
*   **Preconditions**: User is authenticated; there are available training modules; the system tracks progress.
*   **Trigger**: User navigates to the Learning Center or receives an automated assignment.

### Main Flow:
1.  User opens the Learning Center and selects a module (e.g., “Recognize Spear Phishing”).
2.  The system displays microlearning content, including short text, images, sample emails, and embedded interactive items (e.g., hover to reveal red flags).
3.  The user completes the content and takes a brief quiz (5–10 questions).
4.  The system grades the quiz immediately and stores the score in the user's profile.
5.  If required, the system issues a completion certificate and marks the training as complete. Optionally, it sends a notification to a manager or compliance officer.
6.  The system aggregates the training completion data into the admin dashboard metrics.

### Alternate Flows:
*   **3a. Quiz Failure**: If the user fails the quiz, the system recommends specific remediation content and unlocks a retake after a configurable delay.
*   **1a. Offline Access**: If the user is offline, the system preserves their progress locally (using `localStorage`) and syncs the data once a connection is re-established.

### Postconditions:
*   The user's training completion and score are recorded.
*   The user's profile is updated.
*   Organizational-level compliance metrics are updated.

### Acceptance Criteria:
*   Module completion must be tracked per user with timestamps.
*   The quiz retake policy must be configurable by an admin (e.g., maximum of 3 attempts).
*   Completion certificates must be downloadable as a PDF.

---

## Use Case 2: Review & Triage Incident

*   **Actor(s)**: Security Analyst, IT Admin
*   **Preconditions**: The Analyst has the appropriate role (e.g., 'Analyst' or 'Admin') and is authenticated (preferably with 2FA); new incidents are present in the triage queue.
*   **Trigger**: A new incident arrives in the triage queue, or an analyst begins their review shift.

### Main Flow:
1.  The analyst opens the Admin Dashboard and views a list of new incidents, sorted by a calculated risk score or submission time.
2.  The analyst clicks on an incident to open the detail view. This view includes reporter information, attachments, parsed email headers, automatically identified threat indicators (links, domains, hashes), user comments, and the submission timestamp.
3.  The analyst assigns a priority and updates the triage status (e.g., 'New', 'In Progress', 'False Positive', 'Escalated', 'Resolved').
4.  The analyst can tag the incident with relevant Tactics, Techniques, and Procedures (TTPs), add internal notes, and optionally escalate the incident to an external system like a SIEM or SOC via integration.
5.  The analyst resolves the incident, closing it with a final disposition.
6.  The system automatically notifies the original reporter of the resolution and logs all actions for a complete audit trail.
7.  The system updates analytics dashboards with the new data (e.g., incident types, time-to-resolve, top indicators).

### Alternate Flows:
*   **4a. Automated Escalation**: If evidence indicates a high-confidence credential compromise, an automated workflow is triggered (e.g., a password reset prompt for the user via identity provider integration).
*   **2a. Request More Information**: If the analyst needs more context, they can send a secure message to the reporter directly through the platform.

### Postconditions:
*   The incident's final disposition is recorded.
*   All remediation actions are logged and tracked.
*   Compliance and audit logs are updated.

### Acceptance Criteria:
*   The triage queue must support sorting, filtering, and bulk actions (e.g., assign multiple incidents).
*   A comprehensive audit trail must record all actions taken by an analyst, with timestamps.
*   The system must support integrations with SIEM/EDR and identity providers for escalation and response actions.

---

## Use Case 3: User Registration & Authentication

*   **Actor(s)**: Prospective User, Registered User
*   **Preconditions**:
    *   For registration: User has a valid university email address.
    *   For login: User has an existing, active account.
*   **Trigger**: User navigates to the login/register page.

### Main Flow (Registration):
1.  The user selects the “Register” option.
2.  The user provides their name, university email, and a strong password.
3.  The system validates the input data (e.g., password complexity, valid email domain).
4.  The system creates a new user account with the default 'User' role and stores a hashed version of the password.
5.  The system automatically logs the user in and redirects them to the main dashboard.

### Main Flow (Login):
1.  The user enters their registered email and password.
2.  The system verifies the credentials against the stored user data.
3.  On successful verification, the system generates a session token (JWT) and returns it to the client.
4.  The user is redirected to their dashboard.

### Alternate Flows:
*   **3a. Invalid Registration Data**: If validation fails, the system displays specific error messages (e.g., “Password is too weak”).
*   **2a. Invalid Login Credentials**: If authentication fails, the system displays a generic “Invalid credentials” error.

### Postconditions:
*   A new user account is created, or an existing user is successfully authenticated.
*   The user is granted access to the platform according to their role.

### Acceptance Criteria:
*   Password hashing must use a modern, salted algorithm (e.g., bcrypt).
*   Session tokens must have a configurable expiration time.
*   The system must prevent registration with duplicate email addresses.

---

## Use Case 4: Report a Phishing Email

*   **Actor(s)**: Authenticated User (Student, Staff)
*   **Preconditions**: The user is logged into the system and has identified a suspicious email.
*   **Trigger**: The user navigates to the “Report an Incident” page.

### Main Flow:
1.  The user opens the phishing report form.
2.  The user provides details about the email, either by uploading an `.eml` file or by pasting the email's raw source/headers into a text area.
3.  The user adds optional comments describing why the email is suspicious.
4.  The user submits the form.
5.  The system parses the submission, creates a new incident record with a 'New' status, and assigns it a unique ID.
6.  The system sends a confirmation notification to the user, including the incident ID.
7.  The new incident appears in the admin triage queue.

### Alternate Flows:
*   **2a. Invalid File Upload**: If the user uploads an unsupported file type, the system shows an error message and clears the selection.

### Postconditions:
*   A new incident is created in the system and is awaiting review.
*   The user is notified that their report was received.

### Acceptance Criteria:
*   The system must successfully parse key fields from `.eml` files and email headers (e.g., sender, subject, links).
*   The reporting process must not take more than three steps for the user to complete.
*   The user must receive immediate feedback upon successful submission.
