# Data Model (PostgreSQL)

This document defines the relational database schema for the GUARDBULLDOG system using PostgreSQL.

### Table: `User`
Stores user account information.

| Column          | Type      | Constraints                               |
|:----------------|:----------|:------------------------------------------|
| `user_id`       | UUID      | PRIMARY KEY                               |
| `name`          | VARCHAR   | NOT NULL                                  |
| `email`         | VARCHAR   | NOT NULL, UNIQUE                          |
| `role`          | VARCHAR   | NOT NULL, CHECK (role IN (...))           |
| `department`    | VARCHAR   |                                           |
| `last_login`    | TIMESTAMP |                                           |
| `training_status`| JSONB    | Stores progress, scores, etc.             |
| `external_id`   | VARCHAR   | UNIQUE, for campus SSO identity           |

### Table: `Incident`
Stores information about each reported phishing incident.

| Column            | Type      | Constraints                               |
|:------------------|:----------|:------------------------------------------|
| `incident_id`     | UUID      | PRIMARY KEY                               |
| `reporter_user_id`| UUID      | FOREIGN KEY (User.user_id), NULLABLE for guests |
| `reporter_email`  | VARCHAR   | NOT NULL                                  |
| `submission_time` | TIMESTAMP | NOT NULL, DEFAULT now()                   |
| `status`          | VARCHAR   | NOT NULL                                  |
| `priority`        | VARCHAR   |                                           |
| `category`        | VARCHAR   |                                           |
| `subject_line`    | TEXT      |                                           |
| `message_excerpt` | TEXT      |                                           |
| `risk_score`      | INTEGER   |                                           |
| `assigned_to`     | UUID      | FOREIGN KEY (User.user_id)                |
| `tags`            | JSONB     |                                           |
| `remediation_actions`| JSONB  |                                           |
| `closed_time`     | TIMESTAMP |                                           |

### Table: `Attachment`
Stores metadata about attachments linked to an incident.

| Column          | Type      | Constraints                               |
|:----------------|:----------|:------------------------------------------|
| `attachment_id` | UUID      | PRIMARY KEY                               |
| `incident_id`   | UUID      | FOREIGN KEY (Incident.incident_id), NOT NULL |
| `filename`      | VARCHAR   | NOT NULL                                  |
| `content_type`  | VARCHAR   | NOT NULL                                  |
| `s3_key`        | VARCHAR   | NOT NULL, UNIQUE                          |
| `hash_sha256`   | VARCHAR   | NOT NULL                                  |
| `scanned_status`| VARCHAR   | NOT NULL                                  |
| `extracted_iocs`| JSONB     |                                           |

### Table: `TrainingModule`
Defines the available training modules.

| Column          | Type      | Constraints                               |
|:----------------|:----------|:------------------------------------------|
| `module_id`     | UUID      | PRIMARY KEY                               |
| `title`         | VARCHAR   | NOT NULL                                  |
| `duration`      | INTEGER   | Estimated time in minutes                 |
| `content_url`   | VARCHAR   | Link to the module content                |
| `passing_score` | INTEGER   | NOT NULL                                  |
| `required_flag` | BOOLEAN   | DEFAULT false                             |

### Table: `QuizResult`
Tracks user results for training quizzes.

| Column          | Type      | Constraints                               |
|:----------------|:----------|:------------------------------------------|
| `result_id`     | UUID      | PRIMARY KEY                               |
| `user_id`       | UUID      | FOREIGN KEY (User.user_id), NOT NULL      |
| `module_id`     | UUID      | FOREIGN KEY (TrainingModule.module_id), NOT NULL |
| `score`         | INTEGER   | NOT NULL                                  |
| `attempts`      | INTEGER   | NOT NULL, DEFAULT 1                       |
| `completion_time`| TIMESTAMP| NOT NULL, DEFAULT now()                   |

### Table: `AuditLog`
Provides an immutable log of all significant actions.

| Column          | Type      | Constraints                               |
|:----------------|:----------|:------------------------------------------|
| `log_id`        | BIGSERIAL | PRIMARY KEY                               |
| `actor_user_id` | UUID      | FOREIGN KEY (User.user_id)                |
| `action`        | VARCHAR   | NOT NULL                                  |
| `entity_type`   | VARCHAR   | e.g., 'Incident', 'User'                  |
| `entity_id`     | UUID      |                                           |
| `timestamp`     | TIMESTAMP | NOT NULL, DEFAULT now()                   |
| `details`       | JSONB     | Additional context for the action         |
