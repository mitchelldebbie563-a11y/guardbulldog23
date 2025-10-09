# Use Case Diagram

This diagram illustrates the primary interactions between actors (Users and Admins) and the GUARDBULLDOG system.

```mermaid
use case "GUARDBULLDOG System" {
    actor User
    actor Admin

    Admin --|> User // Admin is a specialized type of User

    User -> (Register Account)
    User -> (Login)
    User -> (Complete Awareness Module)
    User -> (Report Phishing Email)

    (Complete Awareness Module) .> (Login) : <<includes>>
    (Report Phishing Email) .> (Login) : <<includes>>

    Admin -> (Review & Triage Incident)
    Admin -> (Manage Educational Content)
    Admin -> (View Analytics Dashboard)

    (Review & Triage Incident) .> (Login) : <<includes>>
    (Manage Educational Content) .> (Login) : <<includes>>
    (View Analytics Dashboard) .> (Login) : <<includes>>
}
```

## Diagram Legend

- **Actors**: 
  - `User`: Represents students, faculty, or staff interacting with the public-facing features.
  - `Admin`: Represents security analysts or IT staff with elevated privileges.

- **Use Cases**:
  - `Register Account`: A new user creating an account.
  - `Login`: An existing user authenticating themselves.
  - `Complete Awareness Module`: A user engaging with educational content and quizzes.
  - `Report Phishing Email`: A user submitting a suspicious email for review.
  - `Review & Triage Incident`: An admin managing and analyzing submitted reports.
  - `Manage Educational Content`: An admin adding or updating training materials.
  - `View Analytics Dashboard`: An admin viewing system-wide statistics and metrics.

- **Relationships**:
  - `A --|> B`: Actor A is a specialization of Actor B.
  - `A -> (UC)`: Actor A initiates Use Case (UC).
  - `(UC1) .> (UC2) : <<includes>>`: Use Case 1 requires the completion of Use Case 2. For example, reporting an email requires the user to be logged in.
