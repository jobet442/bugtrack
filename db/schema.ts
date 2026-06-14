import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role_enum", [
  "QA_DIRECTOR",
  "QA_MANAGER",
  "QA_LEAD",
  "QA_ENGINEER",
  "DEVELOPER",
  "PRODUCT_MANAGER",
  "BUSINESS_ANALYST",
  "STAKEHOLDER",
]);

export const issueTypeEnum = pgEnum("issue_type", [
  "BUG",
  "TASK",
  "STORY",
  "EPIC",
  "IMPROVEMENT",
  "INCIDENT",
]);

export const issueStatusEnum = pgEnum("issue_status", [
  "NEW",
  "OPEN",
  "ASSIGNED",
  "IN_PROGRESS",
  "READY_FOR_TESTING",
  "QA_TESTING",
  "RESOLVED",
  "CLOSED",
  "REOPENED",
  "BLOCKED",
]);

export const priorityEnum = pgEnum("priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export const severityEnum = pgEnum("severity", [
  "MINOR",
  "MAJOR",
  "CRITICAL",
  "BLOCKER",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: roleEnum("role").notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    emailIdx: index("users_email_idx").on(t.email),
    roleIdx: index("users_role_idx").on(t.role),
  }),
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }),
    code: varchar("code", { length: 50 }).notNull().unique(),
    status: varchar("status", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    codeIdx: index("projects_code_idx").on(t.code),
    statusIdx: index("projects_status_idx").on(t.status),
  }),
);

export const sprints = pgTable(
  "sprints",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").notNull(),
    name: varchar("name", { length: 255 }),
    isActive: boolean("is_active").default(false),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
  },
  (t) => ({
    projectIdx: index("sprints_project_idx").on(t.projectId),
    activeIdx: index("sprints_active_idx").on(t.isActive),
  }),
);

export const issues = pgTable(
  "issues",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").notNull(),
    sprintId: uuid("sprint_id"),
    issueNumber: integer("issue_number"),
    title: varchar("title", { length: 255 }),
    description: text("description"),
    type: issueTypeEnum("type"),
    status: issueStatusEnum("status"),
    priority: priorityEnum("priority"),
    severity: severityEnum("severity"),
    reporterId: uuid("reporter_id"),
    assigneeId: uuid("assignee_id"),
    reviewerId: uuid("reviewer_id"),
    isBlocked: boolean("is_blocked").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    projectIdx: index("issues_project_idx").on(t.projectId),
    sprintIdx: index("issues_sprint_idx").on(t.sprintId),
    statusIdx: index("issues_status_idx").on(t.status),
    priorityIdx: index("issues_priority_idx").on(t.priority),
    severityIdx: index("issues_severity_idx").on(t.severity),
    reporterIdx: index("issues_reporter_idx").on(t.reporterId),
    assigneeIdx: index("issues_assignee_idx").on(t.assigneeId),
    createdIdx: index("issues_created_idx").on(t.createdAt),
  }),
);

export const issueHistory = pgTable(
  "issue_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    issueId: uuid("issue_id").notNull(),
    changedBy: uuid("changed_by").notNull(),
    field: varchar("field", { length: 255 }),
    oldValue: text("old_value"),
    newValue: text("new_value"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    issueIdx: index("history_issue_idx").on(t.issueId),
    userIdx: index("history_user_idx").on(t.changedBy),
    createdIdx: index("history_created_idx").on(t.createdAt),
  }),
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    issueId: uuid("issue_id").notNull(),
    userId: uuid("user_id").notNull(),
    content: text("content").notNull(),
    isInternal: boolean("is_internal").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    issueIdx: index("comments_issue_idx").on(t.issueId),
    userIdx: index("comments_user_idx").on(t.userId),
    createdIdx: index("comments_created_idx").on(t.createdAt),
  }),
);

export const attachments = pgTable(
  "attachments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    issueId: uuid("issue_id").notNull(),
    uploadedBy: uuid("uploaded_by").notNull(),
    fileName: varchar("file_name", { length: 255 }),
    fileUrl: text("file_url"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    issueIdx: index("attachments_issue_idx").on(t.issueId),
    uploaderIdx: index("attachments_uploader_idx").on(t.uploadedBy),
  }),
);

export const testCases = pgTable(
  "test_cases",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").notNull(),
    title: varchar("title", { length: 255 }),
    description: text("description"),
    steps: text("steps"),
    expectedResult: text("expected_result"),
    priority: priorityEnum("priority"),
    createdBy: uuid("created_by"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    projectIdx: index("testcases_project_idx").on(t.projectId),
    priorityIdx: index("testcases_priority_idx").on(t.priority),
  }),
);

export const testExecutions = pgTable(
  "test_executions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    testCaseId: uuid("test_case_id").notNull(),
    issueId: uuid("issue_id"),
    executedBy: uuid("executed_by"),
    status: varchar("status", { length: 50 }),
    actualResult: text("actual_result"),
    notes: text("notes"),
    executedAt: timestamp("executed_at").defaultNow(),
  },
  (t) => ({
    testcaseIdx: index("exec_testcase_idx").on(t.testCaseId),
    issueIdx: index("exec_issue_idx").on(t.issueId),
    statusIdx: index("exec_status_idx").on(t.status),
  }),
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    type: varchar("type", { length: 50 }),
    title: varchar("title", { length: 255 }),
    message: text("message"),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    userIdx: index("notif_user_idx").on(t.userId),
    readIdx: index("notif_read_idx").on(t.isRead),
    createdIdx: index("notif_created_idx").on(t.createdAt),
  }),
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    action: varchar("action", { length: 50 }),
    entity: varchar("entity", { length: 255 }),
    entityId: uuid("entity_id"),
    ipAddress: varchar("ip_address", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    userIdx: index("audit_user_idx").on(t.userId),
    entityIdx: index("audit_entity_idx").on(t.entity),
    entityIdIdx: index("audit_entityid_idx").on(t.entityId),
    createdIdx: index("audit_created_idx").on(t.createdAt),
  }),
);

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    website: text("website"),
    logoUrl: text("logo_url"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    slugIdx: index("org_slug_idx").on(t.slug),
    activeIdx: index("org_active_idx").on(t.isActive),
  }),
);

export const orgMembers = pgTable(
  "org_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orgId: uuid("org_id").notNull(),
    userId: uuid("user_id").notNull(),

    role: roleEnum("role").notNull(),

    isOwner: boolean("is_owner").default(false),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    orgIdx: index("org_members_org_idx").on(t.orgId),
    userIdx: index("org_members_user_idx").on(t.userId),
    uniqueIdx: index("org_members_unique_idx").on(t.orgId, t.userId),
  }),
);

export const projectMembers = pgTable(
  "project_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orgId: uuid("org_id").notNull(),
    projectId: uuid("project_id").notNull(),
    userId: uuid("user_id").notNull(),

    role: roleEnum("role").notNull(),

    isProjectAdmin: boolean("is_project_admin").default(false),

    allocationPercent: integer("allocation_percent"),

    joinedAt: timestamp("joined_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    orgIdx: index("project_members_org_idx").on(t.orgId),
    projectIdx: index("project_members_project_idx").on(t.projectId),
    userIdx: index("project_members_user_idx").on(t.userId),

    uniqueMembership: index("project_members_unique_idx").on(
      t.orgId,
      t.projectId,
      t.userId,
    ),
  }),
);

export const labels = pgTable(
  "labels",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orgId: uuid("org_id").notNull(),
    projectId: uuid("project_id").notNull(),

    name: varchar("name", { length: 100 }).notNull(),
    color: varchar("color", { length: 20 }).notNull(),

    description: text("description"),

    createdBy: uuid("created_by"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    orgIdx: index("labels_org_idx").on(t.orgId),
    projectIdx: index("labels_project_idx").on(t.projectId),
    nameIdx: index("labels_name_idx").on(t.name),
  }),
);

export const issueLabels = pgTable(
  "issue_labels",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orgId: uuid("org_id").notNull(),
    projectId: uuid("project_id").notNull(),

    issueId: uuid("issue_id").notNull(),
    labelId: uuid("label_id").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    orgIdx: index("issue_labels_org_idx").on(t.orgId),
    projectIdx: index("issue_labels_project_idx").on(t.projectId),
    issueIdx: index("issue_labels_issue_idx").on(t.issueId),
    labelIdx: index("issue_labels_label_idx").on(t.labelId),

    uniqueIdx: index("issue_labels_unique_idx").on(t.issueId, t.labelId),
  }),
);

/* =========================
   RELATIONS
========================= */

export const usersRelations = relations(users, ({ many }) => ({
  reportedIssues: many(issues, { relationName: "reporter" }),
  assignedIssues: many(issues, { relationName: "assignee" }),
  reviewedIssues: many(issues, { relationName: "reviewer" }),
  comments: many(comments),
  attachments: many(attachments),
  notifications: many(notifications),
  auditLogs: many(auditLogs),
  orgMembers: many(orgMembers),
  projectMembers: many(projectMembers),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  issues: many(issues),
  sprints: many(sprints),
  testCases: many(testCases),
  members: many(projectMembers),
}));

export const sprintsRelations = relations(sprints, ({ one, many }) => ({
  project: one(projects, {
    fields: [sprints.projectId],
    references: [projects.id],
  }),
  issues: many(issues),
}));

export const issuesRelations = relations(issues, ({ one, many }) => ({
  project: one(projects, {
    fields: [issues.projectId],
    references: [projects.id],
  }),
  sprint: one(sprints, {
    fields: [issues.sprintId],
    references: [sprints.id],
  }),
  reporter: one(users, {
    fields: [issues.reporterId],
    references: [users.id],
    relationName: "reporter",
  }),
  assignee: one(users, {
    fields: [issues.assigneeId],
    references: [users.id],
    relationName: "assignee",
  }),
  reviewer: one(users, {
    fields: [issues.reviewerId],
    references: [users.id],
    relationName: "reviewer",
  }),
  comments: many(comments),
  attachments: many(attachments),
  history: many(issueHistory),
  testExecutions: many(testExecutions),
  labels: many(issueLabels),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  issue: one(issues, {
    fields: [comments.issueId],
    references: [issues.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  issue: one(issues, {
    fields: [attachments.issueId],
    references: [issues.id],
  }),
  user: one(users, {
    fields: [attachments.uploadedBy],
    references: [users.id],
  }),
}));

export const testCasesRelations = relations(testCases, ({ one, many }) => ({
  project: one(projects, {
    fields: [testCases.projectId],
    references: [projects.id],
  }),
  executions: many(testExecutions),
}));

export const testExecutionsRelations = relations(testExecutions, ({ one }) => ({
  testCase: one(testCases, {
    fields: [testExecutions.testCaseId],
    references: [testCases.id],
  }),
  issue: one(issues, {
    fields: [testExecutions.issueId],
    references: [issues.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(orgMembers),
  projectMembers: many(projectMembers),
}));

export const orgMembersRelations = relations(orgMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [orgMembers.orgId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [orgMembers.userId],
    references: [users.id],
  }),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [projectMembers.orgId],
    references: [organizations.id],
  }),
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}));

export const labelsRelations = relations(labels, ({ many }) => ({
  issueLinks: many(issueLabels),
}));

export const issueLabelsRelations = relations(issueLabels, ({ one }) => ({
  issue: one(issues, {
    fields: [issueLabels.issueId],
    references: [issues.id],
  }),
  label: one(labels, {
    fields: [issueLabels.labelId],
    references: [labels.id],
  }),
}));
