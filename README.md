# Seafood Calculator

## Quick Start

```bash
# Install dependencies
pnpm install

# Start database containers
docker-compose up -d

# Generate Prisma client
pnpm -F @seafood/database db:generate

# Push database schema
pnpm -F @seafood/database db:push

# Start development
pnpm dev
```

## Development with AI

This project is designed to be developed with AI assistance. Key files for AI context:

- `/memory-bank/` - Project documentation and context
- `.clinerules` - Project-specific development patterns
- Generated TypeScript types for type safety

## Project Structure

```
seafood-calculator/
├── apps/
│   ├── web/          # Next.js web app
│   ├── mobile/       # React Native (Expo) app
│   └── api/          # Express backend
├── packages/
│   ├── ui/           # Shared UI components
│   ├── database/     # Prisma client & schema
│   ├── calculator/   # Core business logic
│   └── types/        # Shared TypeScript types
└── memory-bank/      # Project documentation
```

## Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps and packages
- `pnpm test` - Run tests
- `pnpm lint` - Lint all code
- `pnpm format` - Format code with Prettier

## Database Management

- `pnpm -F @seafood/database db:generate` - Generate Prisma client
- `pnpm -F @seafood/database db:push` - Push schema changes
- `pnpm -F @seafood/database db:studio` - Open Prisma Studio

## Contributing

1. Check memory-bank for context
2. Follow .clinerules patterns
3. Ensure type safety
4. Write tests for new features
5. Update documentation