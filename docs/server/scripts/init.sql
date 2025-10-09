-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: User
-- Stores user account information.
CREATE TABLE "User" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('reporter', 'analyst', 'admin', 'trainer', 'student', 'staff', 'faculty')),
    department VARCHAR(255),
    last_login TIMESTAMPTZ,
    training_status JSONB,
    external_id VARCHAR(255) UNIQUE
);

-- Table: Incident
-- Stores information about each reported phishing incident.
CREATE TABLE "Incident" (
    incident_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_user_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL, -- Nullable for guest reporters
    reporter_email VARCHAR(255) NOT NULL,
    submission_time TIMESTAMPTZ NOT NULL DEFAULT now(),
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50),
    category VARCHAR(100),
    subject_line TEXT,
    message_excerpt TEXT,
    risk_score INTEGER,
    assigned_to UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    tags JSONB,
    remediation_actions JSONB,
    closed_time TIMESTAMPTZ
);

-- Table: Attachment
-- Stores metadata about attachments linked to an incident.
CREATE TABLE "Attachment" (
    attachment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES "Incident"(incident_id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    s3_key VARCHAR(1024) NOT NULL UNIQUE,
    hash_sha256 VARCHAR(64) NOT NULL,
    scanned_status VARCHAR(50) NOT NULL,
    extracted_iocs JSONB
);

-- Table: TrainingModule
-- Defines the available training modules.
CREATE TABLE "TrainingModule" (
    module_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    duration INTEGER, -- Estimated time in minutes
    content_url VARCHAR(1024),
    passing_score INTEGER NOT NULL,
    required_flag BOOLEAN DEFAULT false
);

-- Table: QuizResult
-- Tracks user results for training quizzes.
CREATE TABLE "QuizResult" (
    result_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES "User"(user_id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES "TrainingModule"(module_id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 1,
    completion_time TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: AuditLog
-- Provides an immutable log of all significant actions.
CREATE TABLE "AuditLog" (
    log_id BIGSERIAL PRIMARY KEY,
    actor_user_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    details JSONB
);

-- Add indexes for frequently queried columns
CREATE INDEX idx_incident_status ON "Incident"(status);
CREATE INDEX idx_incident_assigned_to ON "Incident"(assigned_to);
CREATE INDEX idx_attachment_incident_id ON "Attachment"(incident_id);
CREATE INDEX idx_quizresult_user_module ON "QuizResult"(user_id, module_id);
