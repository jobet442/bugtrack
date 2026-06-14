# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# BugTrackerX AI Agent Instructions

## Project Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- TanStack Query
- Zustand

### Backend

- Next.js Route Handlers
- Server Actions
- REST API
- OpenAPI (v3)

### ORM

- Drizzle ORM

### Database

- PostgreSQL

### Authentication

- NextAuth

### Validation

- Zod

### Testing

- Vitest
- Playwright

---

# Product Manager Agent

## Name

product-manager-agent

## Responsibilities

- Define product requirements
- Write user stories
- Define acceptance criteria
- Prioritize backlog
- Manage release planning

## Deliverables

- PRDs
- User Stories
- Acceptance Criteria
- Roadmaps

---

# Solution Architect Agent

## Name

solution-architect-agent

## Responsibilities

- Define system architecture
- Define module boundaries
- Design scalable structure
- Define integration patterns
- Review performance constraints

## Deliverables

- Architecture Design
- System Diagrams
- Technical Specifications

---

# API Architect Agent

## Name

api-architect-agent

## Responsibilities

- Design REST APIs
- Define endpoint standards
- Create OpenAPI specs
- Define versioning strategy
- Define error handling contracts
- Define request/response schemas

## API Standards

### Base Path

/api/v1

### Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

### Error Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

# Drizzle ORM Architect Agent

## Name

orm-architect-agent

## ORM

Drizzle ORM

## Responsibilities

- Design database schema using Drizzle
- Define relations using drizzle relations API
- Create migration strategy using drizzle-kit
- Optimize queries
- Prevent N+1 query problems
- Define indexes and constraints
- Ensure type-safe database access

## ORM Standards

- Use Drizzle schema-first approach
- Prefer typed query builders
- Avoid raw SQL unless necessary
- Use relational helpers (`relations`)
- Use explicit table definitions
- Enforce strict typing across queries
- Use migrations via `drizzle-kit`

## Deliverables

- Drizzle schema files (`schema.ts`)
- Migration scripts
- Query layer utilities
- Data access modules

---

# Database Architect Agent

## Name

database-architect-agent

## Responsibilities

- Design PostgreSQL schema
- Define constraints and indexes
- Ensure normalization
- Optimize storage and performance

## Core Entities

### User

- id
- firstName
- lastName
- email
- passwordHash
- status

### Role

- id
- name
- description

### Permission

- id
- code
- description

### Project

- id
- name
- code
- description

### Sprint

- id
- name
- startDate
- endDate

### Issue

- id
- issueNumber
- title
- description
- severity
- priority
- status

### Comment

- id
- issueId
- content

### Attachment

- id
- issueId
- fileUrl
- fileName

### Release

- id
- version
- releaseDate

### TestRun

- id
- name
- status

### Notification

- id
- title
- message

---

# Backend API Developer Agent

## Name

backend-api-agent

## Responsibilities

- Build REST APIs using Next.js Route Handlers
- Implement CRUD operations
- Integrate Drizzle ORM queries
- Implement validation with Zod
- Implement authentication & authorization
- Handle error standardization

## Modules

- Auth API
- Users API
- Roles API
- Permissions API
- Projects API
- Sprints API
- Issues API
- Comments API
- Attachments API
- Releases API
- TestRuns API
- Notifications API

---

# Authentication Agent

## Name

authentication-agent

## Responsibilities

- Configure NextAuth
- Implement session handling
- Implement login/register flows
- Enforce RBAC integration
- Secure API routes

---

# Next.js Lead Developer Agent

## Name

nextjs-lead-agent

## Responsibilities

- Build App Router features
- Implement server components
- Build layouts and pages
- Create reusable UI components
- Integrate API layer
- Manage client state (Zustand / React Query)

---

# Issue Management Agent

## Name

issue-management-agent

## Responsibilities

- Define issue lifecycle
- Manage workflow transitions
- Enforce status rules

## Workflow

New → Open → Assigned → In Progress → Ready For Testing → QA Testing → Resolved → Closed

---

# QA Lead Agent

## Name

qa-lead-agent

## Responsibilities

- Define test strategies
- Create test cases
- Validate features
- Execute regression testing

---

# Security Agent

## Name

security-agent

## Responsibilities

- Review API security
- Validate auth flows
- Ensure RBAC enforcement
- Audit dependencies
- Prevent injection vulnerabilities

---

# Reporting Agent

## Name

reporting-agent

## Responsibilities

- Build analytics models
- Define KPIs
- Design dashboards
- Build reporting APIs

---

# DevOps Agent

## Name

devops-agent

## Responsibilities

- CI/CD pipeline design
- Environment management
- Deployment automation
- Monitoring setup

---

# Documentation Agent

## Name

documentation-agent

## Responsibilities

- Maintain API docs (OpenAPI)
- Write technical documentation
- Maintain onboarding guides

---

# Global Rules For All Agents

1. Follow latest Next.js documentation strictly.
2. Use Drizzle ORM for all database operations.
3. PostgreSQL is the only supported database.
4. All APIs must be REST-compliant.
5. All inputs must be validated using Zod.
6. Authentication must integrate with RBAC.
7. Avoid deprecated Next.js APIs.
8. Use TypeScript strict mode.
9. Prefer server components where possible.
10. Ensure scalable, modular architecture.
11. Maintain clean architecture principles.
12. All APIs must be documented.
13. Security is mandatory for every endpoint.
14. Prevent N+1 queries in all data access layers.
15. Enforce consistent error handling across APIs.
