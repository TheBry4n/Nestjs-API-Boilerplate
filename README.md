# NestJS API Boilerplate

A robust and scalable REST API built with NestJS, showcasing modern backend development practices and security implementations.

## 🚧 Status

**Work in Progress** - This project is actively developed as a demonstration of my technical capabilities and expertise in backend development.

## 🛠️ Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Sessions**: Redis
- **Authentication**: JWT with Argon2 password hashing
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Language**: TypeScript

## ✨ Features

### Authentication & Security
- JWT-based authentication with access and refresh tokens
- Argon2 password hashing for enhanced security
- Redis-based session management
- Token blacklisting for secure logout
- Password strength validation

### Database & Caching
- PostgreSQL database with Prisma ORM
- Redis for session storage and token management
- Database migrations with Prisma
- Connection pooling and optimization

### API Features
- RESTful API design
- Request/Response validation with DTOs
- Swagger documentation
- Error handling and logging
- TypeScript for type safety

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nestjs-api-boilerplate
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start services with Docker**
```bash
docker-compose up -d
```

5. **Run database migrations**
```bash
npm run prisma:migrate
```

6. **Start the application**
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:
- **Swagger UI**: http://localhost:3000/api/docs

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:deploy      # Deploy migrations

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run tests with coverage

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
├── modules/
│   ├── auth/              # Authentication module
│   └── users/             # User management module
├── prisma/                # Database schema and migrations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility services (JWT, Redis, Password)
```

## 🔐 Environment Variables

```env
# Database
DATABASE_CONNECTION_URL="postgresql://user:password@localhost:5432/dbname"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🐳 Docker

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 📈 Performance & Security

- **Password Security**: Argon2 hashing with configurable parameters
- **Token Management**: JWT with Redis-based blacklisting
- **Session Handling**: Redis-backed session storage
- **Database**: Optimized queries with Prisma ORM
- **Validation**: Comprehensive input validation with class-validator

## 🤝 Contributing

This is a demonstration project, but suggestions and improvements are welcome!

---

**Note**: This project is a work in progress and serves as a demonstration of backend development capabilities and best practices.