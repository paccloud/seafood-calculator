# Seafood Calculator Web Application

## Overview
The web interface for the Seafood Calculator project, built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Jest &amp; React Testing Library

## Directory Structure
```
src/
├── app/              # App router pages and layouts
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── features/    # Feature-specific components
├── lib/             # Utility functions and hooks
│   ├── utils/
│   └── hooks/
└── types/           # TypeScript type definitions
```

## Development
1. Install dependencies:
```bash
pnpm install
```

2. Run development server:
```bash
pnpm dev
```

3. Run tests:
```bash
pnpm test           # Run tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage report
```

4. Lint code:
```bash
pnpm lint
```

## Code Standards
- Follow TypeScript strict mode
- Maintain 80% test coverage
- Use ESLint and Prettier for code formatting
- Write JSDoc comments for functions
- Follow React hooks best practices

## Contributing
1. Create a feature branch
2. Make changes following the code standards
3. Write tests for new features
4. Submit a pull request for review

## Documentation
- See `/memory-bank/adr` for architecture decisions
- Component documentation in respective README files
- API documentation in Swagger/OpenAPI format
