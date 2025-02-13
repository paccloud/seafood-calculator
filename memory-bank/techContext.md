# Technical Context

## Development Environment

### Monorepo Setup
- Turborepo for workspace management
- pnpm for package management
- Shared packages in packages/ directory
- Apps in apps/ directory

### Database Setup
- PostgreSQL database in Docker
- Connection URL: postgresql://seafood:seafood@localhost:5432/seafood_calculator
- Redis cache for performance
- Regular backups to shared/database_backup.sql

### Project Structure
```
/
├── apps/               # Application code
│   ├── web/           # Next.js web app
│   ├── mobile/        # Expo React Native app
│   └── api/           # Express backend
├── packages/          # Shared packages
│   ├── ui/            # UI components
│   ├── database/      # Prisma client
│   ├── calculator/    # Core logic
│   └── types/         # Shared types
├── prisma/           # Database schema
└── memory-bank/      # Project documentation
```

## Technologies Used

### Frontend
- React Native Web
- Next.js for web platform
- Expo for mobile
- React Query for state
- Tailwind CSS
- shadcn/ui components
- TypeScript

### Backend
- Node.js/Express
- Prisma ORM
- PostgreSQL database
- Redis cache
- RESTful API design

### Development Tools
- Turborepo
- pnpm
- Docker
- Git
- Prisma Studio
- Expo CLI

## Technical Constraints

### Monorepo
- Commands must run from project root
- Packages must declare dependencies
- Shared code must be platform-agnostic
- Type safety across workspace

### Database
- Prisma schema requires specific configuration
- Redis cache for performance optimization
- Regular backups required
- Migration management through Prisma

### API
- Rate limiting on public endpoints
- Authentication required for sensitive operations
- Validation middleware for all inputs
- Cross-platform compatibility

### Frontend
- Mobile-first design required
- Accessibility compliance needed
- Performance optimization for large datasets
- Cross-platform UI consistency

## Dependencies

### Core Dependencies
- React Native
- Next.js
- Expo
- Express
- Prisma
- PostgreSQL
- Redis
- Tailwind CSS
- shadcn/ui

### Development Dependencies
- TypeScript
- ESLint
- Prettier
- Jest
- React Testing Library
- Prisma CLI
- Turborepo
- Docker

## Security Considerations
1. Environment variables for sensitive data
2. Input validation on all forms
3. API rate limiting
4. SQL injection prevention via Prisma
5. XSS protection in React Native
6. Authentication token management
7. Data encryption at rest
8. Secure mobile storage