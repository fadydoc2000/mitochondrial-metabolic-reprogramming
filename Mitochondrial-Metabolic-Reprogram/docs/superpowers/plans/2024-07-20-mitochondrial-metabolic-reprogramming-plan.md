# Mitochondrial Metabolic Reprogramming Application Implementation Plan

**Date**: July 20, 2024  
**Version**: 2.0 (Updated with 2024-2026 Clinical Evidence)  
**Based on Design**: docs/superpowers/specs/2024-07-20-mitochondrial-metabolic-reprogramming-design.md  
**Research Integration**: Thomas Seyfried's Latest Publications (2024-2026)

## Overview

This implementation plan outlines the phased development of the Mitochondrial Metabolic Reprogramming (MMR) web application based on Professor Thomas Seyfried's cutting-edge research on metabolic cancer theory and mitochondrial health. The application is designed as a **public, non-profit digital health tool** to help individuals understand, track, and optimize their metabolic state using evidence-based metrics and protocols. The plan follows a pragmatic approach aligned with the Ponytail principle, focusing on delivering measurable value at each stage while maintaining technical quality, clinical safety, and extensibility.

### Clinical Context (2024-2026 Research)
Recent publications (Seyfried et al., 2024-2026) demonstrate:
- **Glucose-Ketone Index (GKI)** as a quantifiable biomarker for metabolic state
- **Press-Pulse Protocol** as an integrated framework combining sustained metabolic stress with targeted interventions
- **Glioblastoma outcomes**: 66.7% 3-year survival (vs. typical 12-15 months) with diet adherence
- **Adherence as critical success factor**: Only diet-compliant patients (>6 months) achieved therapeutic benefits
- Digital health tools significantly improve metabolic tracking and treatment adherence

## Global Constraints

- Use React 18+ with TypeScript 5+ for frontend
- Use Node.js 18+ or Bun for backend
- Use PostgreSQL 15+ for database
- Implement JWT-based authentication with refresh tokens
- Follow WCAG 2.1 AA accessibility guidelines
- Maintain >80% test coverage for business logic
- Implement privacy-by-design for health data
- Use Docker for containerization
- Implement CI/CD with GitHub Actions

---

### Task 1: Initialize repository with proper structure (frontend/backend separation)

**Files:**
- Create: `README.md`
- Create: `package.json` (root)
- Create: `frontend/package.json`
- Create: `backend/package.json`
- Create: `docker-compose.yml`
- Create: `.gitignore`

**Interfaces:**
- Consumes: None (initial setup)
- Produces: Repository structure for frontend/backend separation

- [ ] **Step 1: Create project structure**

```bash
mkdir -p frontend/src/{components,pages,services,store,utils,assets,styles}
mkdir -p backend/src/{controllers,models,routes,services,utils,middleware,config}
mkdir -p docs/superpowers/{specs,plans}
```

- [ ] **Step 2: Initialize root package.json**

```json
{
  "name": "mitochondrial-metabolic-reprogramming",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=backend\"",
    "test": "npm test --workspace=frontend && npm test --workspace=backend"
  }
}
```

- [ ] **Step 3: Initialize frontend package.json**

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^6.0.0",
    "@mui/icons-material": "^6.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-router-dom": "^6.15.0",
    "formik": "^2.4.0",
    "yup": "^1.2.0",
    "recharts": "^2.8.0",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/jest": "^29.5.0",
    "typescript": "^5.2.0",
    "vite": "^4.4.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.0"
  }
}
```

- [ ] **Step 4: Initialize backend package.json**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.5.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.0",
    "dotenv": "^16.3.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "rate-limiter-flexible": "^3.0.0",
    "joi": "^17.9.0",
    "redis": "^4.6.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.5.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/bcryptjs": "^2.4.0",
    "typescript": "^5.2.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0",
    "jest": "^29.6.0",
    "@types/jest": "^29.5.0",
    "supertest": "^6.3.0",
    "ts-jest": "^29.1.0",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  }
}
```

- [ ] **Step 5: Create basic docker-compose.yml**

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - backend
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/mmr
    depends_on:
      - db
  
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mmr
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
volumes:
  postgres_data:
```

- [ ] **Step 6: Create .gitignore**

```
# Node
node_modules/
dist/
build/
.env
.env.*
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pidof

# Build outputs
*.tsbuildinfo
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov*

# Grunt middleware storage (https://gruntjs.com/creating-plugins)
.grunt

# Environment variables
.env
.env.*
!.env.example

# Docker
docker-compose.override.yml

# Misc
.DS_Store
.env.local
.env.development
.env.test
.env.production
```

- [ ] **Step 7: Initialize git repository and make initial commit**

```bash
git init
git add .
git commit -m "feat: initialize project structure with frontend/backend separation"
```

### Task 2: Set up development environment (Node.js, React, PostgreSQL, Docker)

**Files:**
- Create: `frontend/vite.config.ts`
- Create: `backend/tsconfig.json`
- Create: `Dockerfile.frontend`
- Create: `Dockerfile.backend`
- Modify: `docker-compose.yml`

**Interfaces:**
- Consumes: Repository structure from Task 1
- Produces: Configured development environment

- [ ] **Step 1: Configure frontend Vite**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4000
  }
})
```

- [ ] **Step 2: Configure backend TypeScript**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create frontend Dockerfile**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.html"]
```

- [ ] **Step 4: Create backend Dockerfile**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```

- [ ] **Step 5: Update docker-compose.yml to include build contexts**

```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    # ... rest unchanged
    
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    # ... rest unchanged
```

- [ ] **Step 6: Test that environment builds and runs**

```bash
docker-compose build
docker-compose up -d
# Wait for containers to start, then verify:
docker-compose ps
# Should show frontend, backend, db, redis as healthy
```

- [ ] **Step 7: Commit environment setup**

```bash
git add .
git commit -m "feat: set up development environment with Docker, Vite, and TypeScript config"
```

### Task 3: Configure basic CI/CD pipeline with GitHub Actions

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/cd.yml`
- Create: `scripts/test.sh`
- Create: `scripts/build.sh`
- Create: `scripts/deploy.sh`

**Interfaces:**
- Consumes: Development environment from Task 2
- Produces: Automated CI/CD pipeline

- [ ] **Step 1: Create CI workflow**

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: mmr_test
        ports: [5432:5432]
        options: >-
          --health-cmd "pg_isready -U $$POSTGRES_USER"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7-alpine
        ports: [6379:6379]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        npm run install:all
    
    - name: Run frontend tests
      run: npm run test --workspace=frontend
      env:
        CI: true
    
    - name: Run backend tests
      run: npm run test --workspace=backend
      env:
        CI: true
        DATABASE_URL: postgresql://user:password@localhost:5432/mmr_test
        REDIS_URL: redis://localhost:6379
    
    - name: Lint code
      run: npm run lint
    
    - name: Build applications
      run: npm run build
```

- [ ] **Step 2: Create CD workflow (stub for now)**

```yaml
name: CD

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for production
      run: npm run build
    
    # Deployment steps would go here (to be implemented later)
    - name: Echo deployment info
      run: echo "Deploying to staging environment"
```

- [ ] **Step 3: Create helper scripts**

```bash
# scripts/test.sh
#!/bin/bash
echo "Running all tests..."
npm run test --workspace=frontend
npm run test --workspace=backend
```

```bash
# scripts/build.sh
#!/bin/bash
echo "Building all applications..."
npm run build
```

```bash
# scripts/deploy.sh
#!/bin/bash
echo "Deployment script placeholder"
```

- [ ] **Step 4: Make scripts executable and add to package.json**

```bash
chmod +x scripts/*.sh
```

```json
// Add to root package.json scripts
{
  "scripts": {
    "test": "bash scripts/test.sh",
    "build": "bash scripts/build.sh",
    "deploy": "bash scripts/deploy.sh",
    "install:all": "npm install --workspace=frontend && npm install --workspace=backend"
  }
}
```

- [ ] **Step 5: Commit CI/CD setup**

```bash
git add .
git commit -m "feat: configure basic CI/CD pipeline with GitHub Actions"
```

### Task 4: Implement project linting and formatting (ESLint, Prettier)

**Files:**
- Create: `frontend/.eslintrc.js`
- Create: `frontend/.prettierrc`
- Create: `backend/.eslintrc.js`
- Create: `backend/.prettierrc`
- Create: `.eslintrc.js` (root for JS files)
- Create: `.prettierrc` (root)

**Interfaces:**
- Consumes: Development environment from Task 2
- Produces: Consistent code formatting and linting

- [ ] **Step 1: Configure frontend ESLint**

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    // Override or add rules here
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }]
  }
}
```

- [ ] **Step 2: Configure frontend Prettier**

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

- [ ] **Step 3: Configure backend ESLint (similar to frontend)**

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }]
  }
}
```

- [ ] **Step 4: Configure backend Prettier (same as frontend)**

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

- [ ] **Step 5: Add lint and format scripts to package.json**

```json
// Add to root package.json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,css,scss,md,json}\" --ignore-unknown",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,css,scss,md,json}\""
  }
}
```

- [ ] **Step 6: Install ESLint and Prettier dependencies**

```bash
# Frontend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-jsx-a11y prettier --workspace=frontend

# Backend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier --workspace=backend

# Root (for JS files)
npm install --save-dev eslint prettier
```

- [ ] **Step 7: Commit linting and formatting setup**

```bash
git add .
git commit -m "feat: implement project linting and formatting with ESLint and Prettier"
```

### Task 5: Set up basic testing framework (Jest, React Testing Library)

**Files:**
- Create: `frontend/vitest.config.ts`
- Create: `frontend/src/setupTests.ts`
- Create: `backend/jest.config.js`
- Create: `backend/src/setupTests.ts`
- Modify: package.json test scripts

**Interfaces:**
- Consumes: Development environment from Task 2
- Produces: Configured testing framework

- [ ] **Step 1: Configure frontend Vitest**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

- [ ] **Step 2: Create frontend setupTests.ts**

```typescript
import '@testing-library/jest-dom'
// Add any global mocks or setup here
```

- [ ] **Step 3: Configure backend Jest**

```javascript
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/main.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

- [ ] **Step 4: Create backend setupTests.ts**

```typescript
// Add any global mocks or setup here
```

- [ ] **Step 5: Update test scripts in package.json**

```json
// Add to root package.json
{
  "scripts": {
    "test": "vitest run --workspace=frontend && jest --workspace=backend",
    "test:watch": "vitest --workspace=frontend && jest --watch --workspace=backend",
    "test:coverage": "vitest run --coverage --workspace=frontend && jest --coverage --workspace=backend"
  }
}
```

- [ ] **Step 6: Install testing dependencies**

```bash
# Frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom --workspace=frontend

# Backend
npm install --save-dev jest ts-jest @types/jest --workspace=backend
```

- [ ] **Step 7: Create a simple test to verify setup**

```bash
# frontend/src/__tests__/example.test.tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders welcome message', () => {
  render(<App />)
  const linkElement = screen.getByText(/welcome/i)
  expect(linkElement).toBeInTheDocument()
})
```

```bash
# backend/src/__tests__/example.test.ts
import { expect, test } from '@jest/globals'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})
```

- [ ] **Step 8: Run tests to verify setup works**

```bash
npm run test
```

- [ ] **Step 9: Commit testing framework setup**

```bash
git add .
git commit -m "feat: set up basic testing framework with Vitest and Jest"
```

### Task 6: Create initial database schema (users, profiles, assessments)

**Files:**
- Create: `backend/src/models/User.ts`
- Create: `backend/src/models/Profile.ts`
- Create: `backend/src/models/Assessment.ts`
- Create: `backend/src/models/Zone.ts`
- Create: `backend/src/database/index.ts`
- Create: `backend/src/database/migrate.ts`

**Interfaces:**
- Consumes: Backend setup from previous tasks
- Produces: Database schema for core entities

- [ ] **Step 1: Create database connection setup**

```typescript
// backend/src/database/index.ts
import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
import { User } from '../models/User'
import { Profile } from '../models/Profile'
import { Assessment } from '../models/Assessment'
import { Zone } from '../models/Zone'

config()

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mmr',
  {
    logging: false,
  }
)

// Define models
export const UserModel = User.init(sequelize)
export const ProfileModel = Profile.init(sequelize)
export const AssessmentModel = Assessment.init(sequelize)
export const ZoneModel = Zone.init(sequelize)

// Define associations
UserModel.hasOne(ProfileModel, { foreignKey: 'userId', onDelete: 'CASCADE' })
ProfileModel.belongsTo(UserModel, { foreignKey: 'userId' })

UserModel.hasMany(AssessmentModel, { foreignKey: 'userId' })
AssessmentModel.belongsTo(UserModel, { foreignKey: 'userId' })

AssessmentModel.belongsTo(ZoneModel, { foreignKey: 'zoneId' })
ZoneModel.hasMany(AssessmentModel, { foreignKey: 'zoneId' })

// Export all models
export { UserModel, ProfileModel, AssessmentModel, ZoneModel }
```

- [ ] **Step 2: Define User model**

```typescript
// backend/src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'

interface UserAttributes {
  id: number
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  role: 'user' | 'provider' | 'admin'
  isActive: boolean
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public passwordHash!: string
  public firstName!: string
  public lastName!: string
  public role!: 'user' | 'provider' | 'admin'
  public isActive!: boolean
  public emailVerified!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'provider', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    emailVerized: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
  }
)
```

- [ ] **Step 3: Define Profile model**

```typescript
// backend/src/models/Profile.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'

interface ProfileAttributes {
  id: number
  userId: number
  dateOfBirth: Date | null
  gender: string | null
  height: number | null // in cm
  weight: number | null // in kg
  healthGoals: string | null
  medicalConditions: string | null
  allergies: string | null
  dietaryRestrictions: string | null
  createdAt: Date
  updatedAt: Date
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number
  public userId!: number
  public dateOfBirth!: Date | null
  public gender!: string | null
  public height!: number | null
  public weight!: number | null
  public healthGoals!: string | null
  public medicalConditions!: string | null
  public allergies!: string | null
  public dietaryRestrictions!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    healthGoals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalConditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dietaryRestrictions: {
      type: DataTypes.TEXT, // Store as JSON string
      allowNull: true,
    },
  },
  {
    tableName: 'profiles',
    sequelize,
    timestamps: true,
  }
)
```

- [ ] **Step 4: Define Zone model**

```typescript
// backend/src/models/Zone.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'

interface ZoneAttributes {
  id: number
  name: 'red' | 'yellow' | 'green'
  description: string
  minScore: number
  maxScore: number
  colorCode: string
  createdAt: Date
  updatedAt: Date
}

interface ZoneCreationAttributes extends Optional<ZoneAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Zone extends Model<ZoneAttributes, ZoneCreationAttributes> implements ZoneAttributes {
  public id!: number
  public name!: 'red' | 'yellow' | 'green'
  public description!: string
  public minScore!: number
  public maxScore!: number
  public colorCode!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Zone.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM('red', 'yellow', 'green'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colorCode: {
      type: DataTypes.STRING(7), // Hex color code
      allowNull: false,
    },
  },
  {
    tableName: 'zones',
    sequelize,
    timestamps: true,
  }
)
```

- [ ] **Step 5: Define Assessment model**

```typescript
// backend/src/models/Assessment.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'

interface AssessmentAttributes {
  id: number
  userId: number
  zoneId: number
  glucoseLevel: number | null // mmol/L
  ketoneLevel: number | null // mmol/L
  weight: number | null // kg
  systolicBP: number | null // mmHg
  diastolicBP: number | null // mmHg
  energyLevel: number | null // 1-10 scale
  mentalClarity: number | null // 1-10 scale
  symptomScore: number | null // 0-100 scale
  assessmentDate: Date
  createdAt: Date
  updatedAt: Date
}

interface AssessmentCreationAttributes extends Optional<AssessmentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Assessment extends Model<AssessmentAttributes, AssessmentCreationAttributes> implements AssessmentAttributes {
  public id!: number
  public userId!: number
  public zoneId!: number
  public glucoseLevel!: number | null
  public ketoneLevel!: number | null
  public weight!: number | null
  public systolicBP!: number | null
  public diastolicBP!: number | null
  public energyLevel!: number | null
  public mentalClarity!: number | null
  public symptomScore!: number | null
  public assessmentDate!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Assessment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    zoneId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'zones',
        key: 'id'
      }
    },
    glucoseLevel: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 30
      }
    },
    ketoneLevel: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 20
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 20,
        max: 300
      }
    },
    systolicBP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 50,
        max: 300
      }
    },
    diastolicBP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 30,
        max: 200
      }
    },
    energyLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      }
    },
    mentalClarity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      }
    },
    symptomScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    assessmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  },
  {
    tableName: 'assessments',
    sequelize,
    timestamps: true,
  }
)
```

- [ ] **Step 6: Create database migration/init script**

```typescript
// backend/src/database/migrate.ts
import { sequelize } from './index'
import { UserModel, ProfileModel, AssessmentModel, ZoneModel } from './index'

async function migrate() {
  try {
    // Test connection
    await sequelize.authenticate()
    console.log('Database connection established successfully.')
    
    // Sync models
    await sequelize.sync({ alter: true })
    console.log('All models were synchronized successfully.')
    
    // Initialize zone data if not present
    const zoneCount = await ZoneModel.count()
    if (zoneCount === 0) {
      await ZoneModel.bulkCreate([
        {
          name: 'red',
          description: 'High metabolic vulnerability - immediate intervention needed',
          minScore: 0,
          maxScore: 33,
          colorCode: '#FF0000'
        },
        {
          name: 'yellow',
          description: 'Moderate metabolic risk - lifestyle changes recommended',
          minScore: 34,
          maxScore: 66,
          colorCode: '#FFFF00'
        },
        {
          name: 'green',
          description: 'Optimal metabolic health - maintenance and optimization',
          minScore: 67,
          maxScore: 100,
          colorCode: '#00FF00'
        }
      ])
      console.log('Initialized zone data')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

migrate()
```

- [ ] **Step 7: Add database scripts to package.json**

```json
// Add to backend package.json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "migrate": "ts-node src/database/migrate.ts",
    "seed": "ts-node src/database/seed.ts"
  }
}
```

- [ ] **Step 8: Run migration to create tables**

```bash
# Make sure PostgreSQL is running (via docker-compose or locally)
npm run migrate --workspace=backend
```

- [ ] **Step 9: Commit database schema**

```bash
git add .
git commit -m "feat: create initial database schema for users, profiles, assessments, and zones"
```

---

### Task 7: Implement Glucose-Ketone Index (GKI) tracking system with biomarker integration

**Clinical Significance**: Seyfried's 2024-2026 research identifies GKI as the primary quantifiable biomarker for metabolic state. GKI (Blood Glucose ÷ Blood Ketones) tracks shift from glucose to ketone metabolism and reflects mitochondrial function.

**Files:**
- Create: `backend/src/models/BiomarkerReading.ts`
- Create: `backend/src/models/GKIMetric.ts`
- Create: `backend/src/services/GKICalculator.ts`
- Create: `frontend/src/components/GKITracker.tsx`
- Create: `frontend/src/pages/BiomarkerDashboard.tsx`
- Modify: `backend/src/models/Assessment.ts` (extend with biomarker fields)
- Modify: Database schema

**Interfaces:**
- Consumes: Database schema from Task 6, User authentication
- Produces: Real-time GKI calculation and biomarker tracking system

**Clinical Parameters:**
- **GKI < 1.0**: Therapeutic ketosis (target for cancer patients)
- **GKI 1.0-3.0**: Mild nutritional ketosis
- **GKI > 3.0**: Predominantly glucose metabolism
- Blood Glucose target: <80 mg/dL (during therapeutic ketosis)
- Ketone target: 2-5 mmol/L (beta-hydroxybutyrate)

- [ ] **Step 1: Extend Assessment model with biomarker fields**

```typescript
// backend/src/models/BiomarkerReading.ts
interface BiomarkerReadingAttributes {
  id: number
  userId: number
  readingDate: Date
  // Primary metrics
  bloodGlucose: number | null // mg/dL
  betaHydroxybutyrate: number | null // mmol/L
  // Secondary metrics
  lactate: number | null // mmol/L
  triglycerides: number | null // mg/dL
  hdlCholesterol: number | null // mg/dL
  ldlCholesterol: number | null // mg/dL
  crpInflammatory: number | null // mg/L
  il6Inflammatory: number | null // pg/mL
  // Liver function
  altEnzyme: number | null // U/L
  astEnzyme: number | null // U/L
  // Computed metrics
  gkiScore: number | null // Calculated: glucose / ketones
  metabolicState: 'glucose-dependent' | 'transitioning' | 'ketone-adapted' | null
  createdAt: Date
  updatedAt: Date
}
```

- [ ] **Step 2: Create GKI Calculator service**

```typescript
// backend/src/services/GKICalculator.ts
export class GKICalculator {
  // GKI = Blood Glucose (mg/dL) / Ketones (mmol/L)
  static calculateGKI(glucoseMgdL: number, ketonesMmol: number): number {
    if (ketonesMmol === 0) return Infinity
    return glucoseMgdL / (18 * ketonesMmol) // Convert glucose to mmol/L
  }

  static determineMetabolicState(
    gki: number
  ): 'glucose-dependent' | 'transitioning' | 'ketone-adapted' {
    if (gki < 1.0) return 'ketone-adapted'
    if (gki < 3.0) return 'transitioning'
    return 'glucose-dependent'
  }

  static getTherapeuticStatus(gki: number, targetGKI: number = 1.0): {
    isTherapeutic: boolean
    distance: number
    recommendation: string
  } {
    const distance = gki - targetGKI
    return {
      isTherapeutic: gki <= targetGKI,
      distance,
      recommendation: this.generateRecommendation(distance),
    }
  }

  private static generateRecommendation(distance: number): string {
    if (distance <= 0) return 'Therapeutic ketosis achieved'
    if (distance < 0.5) return 'Near therapeutic - continue current protocol'
    if (distance < 1.0) return 'Increase ketone-producing activities'
    return 'Significant metabolic shift needed - consult healthcare provider'
  }
}
```

- [ ] **Step 3: Create frontend GKI Tracker component**

```typescript
// frontend/src/components/GKITracker.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

export const GKITracker: React.FC<{ userId: number }> = ({ userId }) => {
  const [readings, setReadings] = useState<BiomarkerReading[]>([])
  const [currentGKI, setCurrentGKI] = useState<number | null>(null)
  const [metabolicState, setMetabolicState] = useState<string>('loading')

  useEffect(() => {
    fetchLatestReadings(userId)
  }, [userId])

  return (
    <div className="gki-tracker">
      <h2>Glucose-Ketone Index (GKI) Tracking</h2>
      
      {/* Current GKI Display */}
      <div className={`gki-display ${getGKIStatusClass(currentGKI)}`}>
        <div className="gki-value">{currentGKI?.toFixed(2) ?? 'N/A'}</div>
        <div className="gki-status">{metabolicState}</div>
        <div className="therapeutic-indicator">
          {currentGKI !== null && (
            <ProgressBar value={Math.min(currentGKI, 5)} max={5} />
          )}
        </div>
      </div>

      {/* Biomarker Input */}
      <BiomarkerInputForm onSubmit={handleBiomarkerSubmit} />

      {/* Trend Chart */}
      <LineChart width={600} height={300} data={readings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="readingDate" />
        <YAxis />
        <Line type="monotone" dataKey="gkiScore" stroke="#8884d8" />
      </LineChart>

      {/* Alert System */}
      {currentGKI && currentGKI > 3.0 && (
        <Alert severity="warning">
          GKI is elevated. Consider dietary adjustments.
        </Alert>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create Biomarker Dashboard**

```typescript
// frontend/src/pages/BiomarkerDashboard.tsx
export const BiomarkerDashboard: React.FC = () => {
  return (
    <div className="biomarker-dashboard">
      <h1>Metabolic Health Biomarkers</h1>

      {/* Primary Metrics Section */}
      <MetricCard
        title="Blood Glucose"
        value={`${glucose} mg/dL`}
        target="<80 mg/dL"
        status={glucose < 80 ? 'good' : 'warning'}
      />
      <MetricCard
        title="Ketones (BHB)"
        value={`${ketones} mmol/L`}
        target="2-5 mmol/L"
        status={ketones >= 2 && ketones <= 5 ? 'good' : 'warning'}
      />
      <MetricCard
        title="GKI"
        value={gki?.toFixed(2)}
        target="<1.0 (therapeutic)"
        status={gki && gki < 1.0 ? 'good' : 'warning'}
      />

      {/* Secondary Markers */}
      <Section title="Inflammatory Markers">
        <MetricCard title="CRP" value={crp} unit="mg/L" target="<1.0" />
        <MetricCard title="IL-6" value={il6} unit="pg/mL" target="<5" />
      </Section>

      <Section title="Lipid Panel">
        <MetricCard title="Triglycerides" value={triglycerides} unit="mg/dL" />
        <MetricCard title="HDL" value={hdl} unit="mg/dL" />
        <MetricCard title="LDL" value={ldl} unit="mg/dL" />
      </Section>

      <Section title="Liver Function">
        <MetricCard title="ALT" value={alt} unit="U/L" />
        <MetricCard title="AST" value={ast} unit="U/L" />
      </Section>

      {/* Trend Analysis */}
      <TrendAnalysis readings={historicalReadings} />
    </div>
  )
}
```

- [ ] **Step 5: Create API endpoints for biomarker management**

```typescript
// backend/src/routes/biomarkers.ts
router.post('/api/biomarkers', authenticateUser, async (req, res) => {
  const { bloodGlucose, betaHydroxybutyrate, ...otherMetrics } = req.body
  
  // Calculate GKI
  const gki = GKICalculator.calculateGKI(bloodGlucose, betaHydroxybutyrate)
  const metabolicState = GKICalculator.determineMetabolicState(gki)
  
  const reading = await BiomarkerReading.create({
    userId: req.user.id,
    bloodGlucose,
    betaHydroxybutyrate,
    gkiScore: gki,
    metabolicState,
    ...otherMetrics,
  })

  res.json(reading)
})

router.get('/api/biomarkers/latest', authenticateUser, async (req, res) => {
  const latest = await BiomarkerReading.findOne({
    where: { userId: req.user.id },
    order: [['readingDate', 'DESC']],
  })
  res.json(latest)
})

router.get('/api/biomarkers/history', authenticateUser, async (req, res) => {
  const { days = 30 } = req.query
  const readings = await BiomarkerReading.findAll({
    where: {
      userId: req.user.id,
      readingDate: { [Op.gte]: new Date(Date.now() - days * 86400000) },
    },
    order: [['readingDate', 'ASC']],
  })
  res.json(readings)
})
```

- [ ] **Step 6: Add database migration for biomarker tables**

- [ ] **Step 7: Test GKI calculations with realistic clinical data**

- [ ] **Step 8: Commit biomarker tracking system**

```bash
git add .
git commit -m "feat: implement GKI tracking system with biomarker integration based on 2024-2026 clinical evidence"
```

---

### Task 8: Integrate medical device connectivity (CGM, ketone meters, wearables)

**Clinical Significance**: 2024-2026 research emphasizes frequent biomarker monitoring. CGM (continuous glucose monitors) and ketone meters provide real-time data for precise GKI tracking.

**Files:**
- Create: `backend/src/services/DeviceIntegration.ts`
- Create: `backend/src/models/DeviceConnection.ts`
- Create: `frontend/src/components/DeviceConnector.tsx`
- Create: `backend/src/utils/deviceAdapters/*.ts` (for each device type)

**Supported Devices:**
- Continuous Glucose Monitors: Freestyle Libre, Dexcom, Medtronic Guardian
- Ketone Meters: Keto-Mojo, Abbott Precision Xtra
- Wearables: Apple Watch, Fitbit, Oura Ring (for sleep/activity context)

- [ ] **Step 1: Create device integration framework**
- [ ] **Step 2: Implement CGM data adapter (Dexcom API)**
- [ ] **Step 3: Implement ketone meter data adapter**
- [ ] **Step 4: Create device connection management UI**
- [ ] **Step 5: Add automatic data sync from connected devices**
- [ ] **Step 6: Create device health monitoring (connection status, battery)**

---

### Task 9: Implement Press-Pulse Protocol framework

**Clinical Significance**: Seyfried's 2024-2026 research introduces Press-Pulse Protocol as an integrated approach combining sustained metabolic stress ("Press") with targeted interventions ("Pulse"). This task implements structured guidance for this evidence-based protocol.

**Files:**
- Create: `backend/src/models/ProtocolPhase.ts`
- Create: `backend/src/models/ProtocolIntervention.ts`
- Create: `frontend/src/pages/ProtocolGuidance.tsx`
- Create: `backend/src/services/ProtocolAdvisor.ts`

**Press Phase (Sustained Metabolic Stress):**
- Mediterranean-style ketogenic diet (2:1 to 2.5:1 fat-to-carbs)
- Calorie-restricted nutritional ketosis
- Goal: Create glucose/glutamine scarcity
- Duration: Months 1-ongoing
- Monitoring: Daily-weekly GKI, glucose, ketones

**Pulse Phase (Targeted Interventions):**
- Hyperbaric oxygen therapy (HBOT)
- Strategic medication timing (e.g., mebendazole, ivermectin)
- Fasting windows
- Exercise protocols
- Duration: Periodic, 2-4 weeks

- [ ] **Step 1: Create protocol phase models**
- [ ] **Step 2: Implement protocol progression logic**
- [ ] **Step 3: Create educational content for each phase**
- [ ] **Step 4: Build protocol compliance tracking**
- [ ] **Step 5: Add phase transition recommendations (based on biomarkers)**

---

### Task 10: Implement comprehensive safety screening and contraindication system

**Clinical Significance**: 2024-2026 research identifies critical contraindications and safety considerations. The app must ensure user safety before recommending protocols.

**Files:**
- Create: `backend/src/models/ContraindicationCheck.ts`
- Create: `backend/src/services/SafetyScreening.ts`
- Create: `frontend/src/components/SafetyAssessment.tsx`
- Create: `backend/src/utils/drugDatabase.ts` (medication interactions)

**Absolute/Relative Contraindications to Screen:**
- Type 1 diabetes (ketoacidosis risk)
- Advanced kidney disease
- Liver dysfunction
- Pregnancy
- Severe metabolic disorders
- Medications requiring carbohydrate intake
- Specific cancer types (documented contraindications)

- [ ] **Step 1: Create comprehensive contraindication database**
- [ ] **Step 2: Implement onboarding safety assessment questionnaire**
- [ ] **Step 3: Build medication-diet interaction checker**
- [ ] **Step 4: Create warning/alert system for concerning biomarker combinations**
- [ ] **Step 5: Add "seek medical attention" guidance triggers**
- [ ] **Step 6: Implement liability protection disclaimers**

---

### Task 11: Build adherence coaching and behavioral support system

**Clinical Significance**: 2024-2026 glioblastoma research found only 33% adherence rate; **adherence >6 months was critical for survival benefit**. This task implements behavioral science to maximize compliance.

**Files:**
- Create: `backend/src/models/CoachingPlan.ts`
- Create: `backend/src/services/AdherenceAnalyzer.ts`
- Create: `frontend/src/components/AdherenceCoach.tsx`
- Create: `backend/src/services/NotificationService.ts`

**Adherence Drivers:**
- Daily progress tracking (visual/quantified)
- Milestone achievements and celebrations
- Motivational messaging tied to research outcomes
- Streak tracking (consecutive days compliant)
- Difficulty-specific guidance
- Community support connections

- [ ] **Step 1: Create adherence tracking metrics**
- [ ] **Step 2: Implement smart notification system (not overwhelming)**
- [ ] **Step 3: Build progress visualization and celebrations**
- [ ] **Step 4: Create personalized coaching messages**
- [ ] **Step 5: Implement community forum/peer support features**
- [ ] **Step 6: Add motivational content library (based on research outcomes)**

---

### Task 12: Implement medical provider collaboration features

**Files:**
- Create: `backend/src/models/ProviderConnection.ts`
- Create: `frontend/src/pages/ProviderPortal.tsx`
- Create: `backend/src/services/ReportGenerator.ts`

**Features:**
- Shareable compliance reports for healthcare providers
- Biomarker trend summaries
- Secure messaging between user and provider
- Lab test integration (upload results)
- Alert thresholds for concerning trends
- Patient consent management

- [ ] **Step 1: Create provider account system**
- [ ] **Step 2: Implement secure report generation**
- [ ] **Step 3: Build secure messaging system**
- [ ] **Step 4: Add provider dashboard**
- [ ] **Step 5: Implement HIPAA-compliant data sharing**

---

### Task 13: Implement research data collection (optional, opt-in)

**Clinical Significance**: 2024-2026 research accelerating through multi-site clinical trials. App can contribute de-identified data to advance science.

**Files:**
- Create: `backend/src/models/ResearchConsent.ts`
- Create: `backend/src/services/DataAnonymizer.ts`
- Create: `frontend/src/components/ResearchParticipation.tsx`

**Research Opportunities:**
- Validate GKI protocols at population scale
- Study adherence factors
- Test digital health intervention effectiveness
- Compare outcomes across dietary protocols
- Contribute to pending randomized controlled trials

- [ ] **Step 1: Create research consent framework**
- [ ] **Step 2: Implement data anonymization**
- [ ] **Step 3: Build research participation UI**
- [ ] **Step 4: Create secure research data pipeline**
- [ ] **Step 5: Add IRB compliance documentation**

---

## Updated Objectives Incorporating 2024-2026 Clinical Evidence

### Primary Objectives:
1. **Enable GKI self-tracking** - Empower users to monitor their metabolic state using Seyfried's evidence-based biomarker
2. **Support Press-Pulse Protocol** - Provide structured guidance for sustained metabolic therapy with periodic interventions
3. **Maximize adherence** - Address the critical success factor identified in 2024-2026 research (33% adherence → 66% better outcomes)
4. **Ensure safety** - Screen contraindications and alert for concerning biomarker combinations
5. **Enable provider collaboration** - Facilitate communication between patients and healthcare providers
6. **Contribute to research** - Create infrastructure for validating emerging metabolic therapy approaches

### Key Evidence-Based Outcomes Targets:
- **User Adherence**: >6 months continuous protocol compliance
- **GKI Achievement**: 60% of users achieving therapeutic GKI (<1.0) within 90 days
- **Biomarker Improvements**: Document glucose reduction (<80 mg/dL) and ketone elevation (2-5 mmol/L)
- **User Retention**: >70% 6-month retention for engaged users
- **Safety Record**: Zero preventable adverse events through proper screening

### Non-Profit Impact Metrics:
- Users helped to understand their metabolic health
- Adherence coaching effectiveness
- De-identified research contribution to advancing metabolic therapy science
- Accessibility to underserved populations
---

### Task 13b: Password reset flow (unplanned addition — 2026-07-21)

**Status**: ✓ Complete

Added self-serve forgot/reset password capability because users lost access to existing accounts with no recovery path.

**Files modified:**
- `backend/prisma/schema.prisma` — added `passwordResetToken String? @unique` and `passwordResetExpires DateTime?` to `User` model
- `backend/src/routes/auth.ts` — added `POST /api/auth/forgot-password` (generates token, returns it directly — no email service yet) and `POST /api/auth/reset-password` (validates token, hashes new password, clears token)
- `frontend/src/services/auth.ts` — added `forgotPassword(email)` and `resetPassword(token, password)` functions
- `frontend/src/pages/AuthPage.tsx` — added `'forgot'` and `'reset'` modes; "Forgot password?" link on login form; URL param `?reset=<token>` parsed on mount; success message shows copyable reset link
- `frontend/src/pages/AuthPage.css` — added `.auth-success` green alert styles

**Note:** No email service configured. Reset token returned directly in API response; frontend displays the link for the user to copy. Future: wire SMTP/Resend when email infra is set up.

- [x] Forgot-password API route with token generation
- [x] Reset-password API route with expiry validation
- [x] Frontend forgot/reset UI modes
- [x] DB schema fields applied via `prisma db push`

---

### Task 13c: Animated metabolic pathway diagram (unplanned addition — 2026-07-21)

**Status**: ✓ Complete

Replaced static SVG diagrams on the landing page with animated side-by-side comparison showing the correct biochemical pathways for a healthy cell vs. a cell with damaged mitochondria.

**Files created:**
- `frontend/src/components/MitochondrialDiagram.tsx` — two animated SVG panels (SMIL `<animateMotion>` + CSS keyframes): `HealthyCell` shows glucose glycolysis → pyruvate (cytoplasm) → MPC crossing → PDC→Acetyl-CoA inside matrix + BHB ketolysis inside matrix → Krebs → ETC → OXPHOS → ATP; `DamagedCell` shows glucose-only glycolysis → pyruvate → LDH bypass arc through cytoplasm → Lactate + minimal ATP both outside the mitochondria oval (Warburg effect)
- `frontend/src/components/MitochondrialDiagram.css` — layout grid, label styles, CSS animations (`hc-pulse-g`, `dc-lactate-pulse`, etc.), `prefers-reduced-motion` off-switch, mobile single-column below 760 px

**Files modified:**
- `frontend/src/pages/LandingPage.tsx` — removed old static SVG anatomy card; added `<MitochondrialDiagram />`

**Biochemical accuracy:**
- Acetyl-CoA produced inside the matrix only (PDC / ketolysis), not in cytoplasm
- Pyruvate has its own cytoplasm node before membrane crossing (MPC)
- Lactate produced by LDH in cytoplasm, not inside mitochondria
- BHB ketolysis (SCOT/thiolase) correctly placed inside matrix

- [x] Animated healthy cell pathway (OXPHOS)
- [x] Animated damaged cell (Warburg/fermentation)
- [x] Scientifically correct compartmentalisation
- [x] CSS reduced-motion support
