# ADR 003: Docker and Database Setup

## Status
Proposed

## Context
We need to containerize our application and set up the database infrastructure for the Seafood Calculator. This includes setting up Docker containers for the web app, PostgreSQL database, and Redis cache.

## Decision
We will use:
- Docker Compose for container orchestration
- PostgreSQL 15 for primary database
- Redis 7 for caching
- Prisma as our ORM
- Environment-based configuration

## Implementation Details

### Docker Structure
```
docker/
├── web/
│   └── Dockerfile
├── db/
│   └── init.sql
└── docker-compose.yml
```

### Container Services
1. Web Application
   - Node.js 20 Alpine base
   - Production-optimized build
   - Environment variable configuration

2. PostgreSQL
   - Persistent volume storage
   - Automated initialization
   - Health checks

3. Redis
   - In-memory cache
   - Persistence configuration
   - Health checks

### Database Schema
Initial schema will include:
- Calculation history
- User preferences
- Price configurations

## Technical Details
1. Networking:
   - Internal Docker network
   - Exposed ports for development
   - Secure communication

2. Data Persistence:
   - Named volumes for databases
   - Backup strategy
   - Migration handling

3. Environment Configuration:
   - Development vs Production
   - Secret management
   - Connection pooling

## Consequences
### Positive
- Consistent development environment
- Scalable infrastructure
- Easy deployment
- Data persistence
- Local development matches production

### Negative
- Additional complexity
- Resource overhead
- Learning curve for Docker

## Notes
- Regular database backups needed
- Monitor container health
- Keep images updated
