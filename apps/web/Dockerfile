FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root package files
COPY package.json pnpm-lock.yaml ./

# Copy the app's package.json
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install

# Copy rest of the application
COPY . .

# Build the app
RUN pnpm run build --filter web

EXPOSE 3000

CMD ["pnpm", "start", "--filter", "web"]