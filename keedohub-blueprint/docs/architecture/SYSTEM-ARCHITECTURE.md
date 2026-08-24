# System Architecture

## Initial architecture

Use a modular monolith.

Frontend and server capabilities live in one Next.js application with clear domain modules.

## Layers

UI  
Application services  
Domain modules  
Persistence  
External integrations  
Background jobs

## Future

Extract services only when scaling, ownership or reliability makes extraction worthwhile.
