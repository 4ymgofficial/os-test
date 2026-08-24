# API Architecture

## Principles

- Typed request/response contracts.
- Authentication and authorization at the server boundary.
- Domain actions instead of arbitrary database mutation from the client.
- Validation with schemas.
- Consistent errors.
- Idempotency for retryable operations.

## API surface

Start with route handlers/server actions where appropriate. Avoid building an unnecessary separate API server before the domain boundaries require it.
