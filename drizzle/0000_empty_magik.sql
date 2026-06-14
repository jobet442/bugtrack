CREATE TYPE "public"."issue_status" AS ENUM('NEW', 'OPEN', 'ASSIGNED', 'IN_PROGRESS', 'READY_FOR_TESTING', 'QA_TESTING', 'RESOLVED', 'CLOSED', 'REOPENED', 'BLOCKED');--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('BUG', 'TASK', 'STORY', 'EPIC', 'IMPROVEMENT', 'INCIDENT');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('QA_DIRECTOR', 'QA_MANAGER', 'QA_LEAD', 'QA_ENGINEER', 'DEVELOPER', 'PRODUCT_MANAGER', 'BUSINESS_ANALYST', 'STAKEHOLDER');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('MINOR', 'MAJOR', 'CRITICAL', 'BLOCKER');--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"issue_id" uuid NOT NULL,
	"uploaded_by" uuid NOT NULL,
	"file_name" varchar(255),
	"file_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"action" varchar(50),
	"entity" varchar(255),
	"entity_id" uuid,
	"ip_address" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"issue_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"is_internal" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "issue_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"issue_id" uuid NOT NULL,
	"changed_by" uuid NOT NULL,
	"field" varchar(255),
	"old_value" text,
	"new_value" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"sprint_id" uuid,
	"issue_number" integer,
	"title" varchar(255),
	"description" text,
	"type" "issue_type",
	"status" "issue_status",
	"priority" "priority",
	"severity" "severity",
	"reporter_id" uuid,
	"assignee_id" uuid,
	"reviewer_id" uuid,
	"is_blocked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(50),
	"title" varchar(255),
	"message" text,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"code" varchar(50) NOT NULL,
	"status" varchar(50),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "sprints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" varchar(255),
	"is_active" boolean DEFAULT false,
	"start_date" timestamp,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "test_cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" varchar(255),
	"description" text,
	"steps" text,
	"expected_result" text,
	"priority" "priority",
	"created_by" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "test_executions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_case_id" uuid NOT NULL,
	"issue_id" uuid,
	"executed_by" uuid,
	"status" varchar(50),
	"actual_result" text,
	"notes" text,
	"executed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role_enum" NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "attachments_issue_idx" ON "attachments" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "attachments_uploader_idx" ON "attachments" USING btree ("uploaded_by");--> statement-breakpoint
CREATE INDEX "audit_user_idx" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_entity_idx" ON "audit_logs" USING btree ("entity");--> statement-breakpoint
CREATE INDEX "audit_entityid_idx" ON "audit_logs" USING btree ("entity_id");--> statement-breakpoint
CREATE INDEX "audit_created_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "comments_issue_idx" ON "comments" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "comments_user_idx" ON "comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "comments_created_idx" ON "comments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "history_issue_idx" ON "issue_history" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "history_user_idx" ON "issue_history" USING btree ("changed_by");--> statement-breakpoint
CREATE INDEX "history_created_idx" ON "issue_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "issues_project_idx" ON "issues" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "issues_sprint_idx" ON "issues" USING btree ("sprint_id");--> statement-breakpoint
CREATE INDEX "issues_status_idx" ON "issues" USING btree ("status");--> statement-breakpoint
CREATE INDEX "issues_priority_idx" ON "issues" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "issues_severity_idx" ON "issues" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "issues_reporter_idx" ON "issues" USING btree ("reporter_id");--> statement-breakpoint
CREATE INDEX "issues_assignee_idx" ON "issues" USING btree ("assignee_id");--> statement-breakpoint
CREATE INDEX "issues_created_idx" ON "issues" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notif_user_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notif_read_idx" ON "notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "notif_created_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects_code_idx" ON "projects" USING btree ("code");--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "sprints_project_idx" ON "sprints" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "sprints_active_idx" ON "sprints" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "testcases_project_idx" ON "test_cases" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "testcases_priority_idx" ON "test_cases" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "exec_testcase_idx" ON "test_executions" USING btree ("test_case_id");--> statement-breakpoint
CREATE INDEX "exec_issue_idx" ON "test_executions" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "exec_status_idx" ON "test_executions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");