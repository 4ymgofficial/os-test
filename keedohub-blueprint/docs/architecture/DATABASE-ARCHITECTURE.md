# Database Architecture

## Database

PostgreSQL.

## Rules

- UUID primary keys.
- created_at and updated_at on durable entities.
- workspace_id on workspace-scoped entities.
- Foreign keys where appropriate.
- Explicit indexes for frequent queries.
- Soft deletion only where business requirements justify it.
- RLS and server authorization must agree.

## Initial domains

Identity, workspace, membership, asset, project, task, release, content, service, order, invoice, payment, message, notification and activity.
