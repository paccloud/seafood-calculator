# System Architecture Overview

The Seafood Calculator is built using a monorepo architecture with Turborepo. It consists of the following main components:

*   **apps/**: Contains the application code for the web, mobile, and API.
*   **packages/**: Contains shared packages for UI components, database access, calculator logic, and types.
*   **prisma/**: Contains the database schema.

The frontend is built using React Native Web, Next.js, and Expo. The backend is built using Node.js, Express, and Prisma. The database is PostgreSQL and Redis is used for caching.

## Architecture Diagram

```mermaid
graph TD
    subgraph Client["Client Apps"]
        Web["Next.js Web"]
        Mobile["React Native Mobile"]
    end

    subgraph API["API Layer"]
        Gateway["API Gateway"]
        Auth["Auth Service"]
        Calc["Calculator Service"]
        Export["Export Service"]
    end

    subgraph Data["Data Layer"]
        DB["PostgreSQL"]
        Cache["Redis Cache"]
        Store["File Storage"]
    end

    Client --> API
    API --> Data