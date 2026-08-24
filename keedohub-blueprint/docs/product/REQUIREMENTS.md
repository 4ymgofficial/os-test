# Product Requirements

## Functional requirements

### Authentication
- Users can register, sign in, sign out and recover access.
- Sessions are secure.
- Workspace membership is enforced server-side.

### Workspace
- User can create/select a workspace.
- Workspace stores creative context.
- User can update identity and preferences.

### Assets
- User can upload supported files.
- Files have metadata and versions.
- Private assets require authorization.
- Shared assets use controlled access.

### Projects
- User can create projects.
- Projects have status, dates, tasks and assets.
- Activity is recorded.

### Artist release
- Artist can create a release.
- Release has lifecycle states.
- Required assets and tasks can be tracked.
- Release connects to content planning.

### Content
- User can create content items.
- Content has format, channel, status and related project/release.
- Content gaps can be detected by deterministic rules.

### Studio
- User can request a service.
- Request becomes a brief/order/project.
- Delivery returns to the workspace.

## Non-functional

Performance, accessibility, security, observability, responsive behavior and testability are release requirements, not later enhancements.
