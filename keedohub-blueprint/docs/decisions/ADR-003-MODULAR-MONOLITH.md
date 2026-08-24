# ADR-003: Modular Monolith

## Decision

Start as a modular monolith.

## Reason

The product is still discovering domain boundaries. A monolith reduces deployment and operational complexity while preserving explicit module boundaries.

## Future

Extract services only when justified by scale, ownership or reliability.
