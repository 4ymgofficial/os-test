# Workflow Engine

## Purpose

Represent deterministic multi-step processes.

## Primitive

Trigger → Preconditions → Actions → State change → Notifications → Audit event

## Requirements

Workflows must be idempotent where possible and safe to retry.
