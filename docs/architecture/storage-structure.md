# Storage Structure

The Seafood Calculator uses PostgreSQL for structured data and Redis for caching.

## PostgreSQL

PostgreSQL is used to store the following data:

*   Species information
*   Yield calculations
*   Cost computations
*   User accounts
*   Quotes

The database schema is defined in `prisma/schema.prisma`.

## Redis

Redis is used for caching the following data:

*   API responses
*   Calculation results
*   User sessions

## File Storage

File storage is used for storing the following data:

*   User avatars
*   Quote PDFs
*   Exported data