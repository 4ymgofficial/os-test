# ADR-002: Supabase

## Decision

Use Supabase initially for PostgreSQL, authentication and object storage.

## Reason

It provides a strong foundation while allowing Keedohub to remain PostgreSQL-centered.

## Constraint

Business/domain logic remains in Keedohub application modules rather than becoming a collection of uncontrolled client-side database calls.
