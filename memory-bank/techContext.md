# Tech Context: Next.js Blog Platform

## Technologies Used

### Core Framework
- **Next.js 15.4.6**: Latest version with App Router
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety throughout application
- **Node.js**: Runtime environment for server-side operations

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React 0.539.0**: Icon library for UI elements
- **PostCSS**: CSS processing with Tailwind integration
- **Responsive Design**: Mobile-first approach

### Authentication
- **NextAuth.js 5.0.0-beta.29**: Authentication library
- **Credentials Provider**: Email/password authentication
- **JWT Tokens**: Session management with role-based claims
- **Secure Cookies**: HttpOnly cookies for session storage

### Development Tools
- **ESLint 8.57.0**: Code linting with Next.js config
- **Prettier 3.0.0**: Code formatting
- **Husky 8.0.0**: Git hooks for code quality
- **Lint-staged 15.0.0**: Pre-commit linting

## Development Setup

### Installation & Startup
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
```

### Development Scripts
```bash
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run type-check  # TypeScript type checking
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
```

### Environment Configuration
- **Development**: `npm run dev` on http://localhost:3000
- **Production**: `npm run build && npm run start`
- **Type Checking**: Continuous TypeScript validation
- **Hot Reload**: Automatic refresh during development

## Technical Constraints

### Data Storage
- **No Database**: JSON file-based storage only
- **File System**: Read/write operations to `src/data/posts.json`
- **Concurrent Access**: No locking mechanism for file operations
- **Data Persistence**: Changes persist across server restarts

### Authentication Limitations
- **Demo Credentials**: Hardcoded admin user (admin@example.com / admin123)
- **Single User**: No user registration or multiple users
- **Session Storage**: In-memory session management
- **No Password Reset**: No forgot password functionality

### Performance Constraints
- **File I/O**: JSON file operations for each request
- **No Caching Layer**: Relies on Next.js built-in caching
- **Static Generation**: Limited to build-time post generation
- **Client-Side State**: No global state management library

## Dependencies Analysis

### Production Dependencies
```json
{
  "lucide-react": "^0.539.0",     // Icons and UI elements
  "next": "15.4.6",               // Core framework
  "next-auth": "^5.0.0-beta.29",  // Authentication
  "react": "19.1.0",              // UI library
  "react-dom": "19.1.0"           // DOM rendering
}
```

### Development Dependencies
```json
{
  "@eslint/eslintrc": "^3",           // ESLint configuration
  "@tailwindcss/postcss": "^4",      // Tailwind PostCSS plugin
  "@types/node": "^20.19.11",        // Node.js types
  "@types/react": "^19",             // React types
  "@types/react-dom": "^19",         // React DOM types
  "eslint": "^8.57.0",               // Code linting
  "eslint-config-next": "15.4.6",    // Next.js ESLint config
  "eslint-config-prettier": "^9.0.0", // Prettier integration
  "husky": "^8.0.0",                 // Git hooks
  "lint-staged": "^15.0.0",          // Pre-commit linting
  "prettier": "^3.0.0",              // Code formatting
  "tailwindcss": "^4",               // CSS framework
  "typescript": "^5"                 // TypeScript compiler
}
```

## Tool Usage Patterns

### Code Quality
- **Pre-commit Hooks**: Automatic linting and formatting
- **ESLint Rules**: Next.js recommended + Prettier integration
- **TypeScript Strict**: Full type checking enabled
- **Import Organization**: Automatic import sorting

### Build Process
- **Next.js Build**: Optimized production builds
- **Static Export**: Pre-rendered pages for performance
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination

### Development Workflow
- **Hot Module Replacement**: Instant updates during development
- **Error Overlay**: Detailed error information in development
- **TypeScript Integration**: Real-time type checking
- **Fast Refresh**: Preserves component state during updates

## Configuration Files

### Next.js Configuration (`next.config.ts`)
- TypeScript configuration file
- Custom webpack configurations if needed
- Environment variable handling
- Build optimization settings

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Path mapping for clean imports
- Next.js specific compiler options
- Include/exclude patterns

### ESLint Configuration (`eslint.config.mjs`)
- Next.js recommended rules
- Prettier integration
- Custom rule overrides
- TypeScript parser configuration

### Tailwind Configuration (`postcss.config.mjs`)
- Tailwind CSS plugin configuration
- PostCSS processing pipeline
- Custom utility classes if needed
- Responsive breakpoint definitions

## Performance Considerations

### Bundle Size
- **Next.js Optimization**: Automatic code splitting and optimization
- **Tree Shaking**: Eliminates unused code from bundles
- **Dynamic Imports**: Lazy loading for non-critical components
- **Image Optimization**: Next.js Image component for performance

### Runtime Performance
- **Server Components**: Reduced client-side JavaScript
- **Static Generation**: Pre-rendered pages for faster loading
- **Caching Strategy**: Leverages Next.js built-in caching
- **Minimal Client State**: Reduces hydration overhead

### Development Experience
- **Fast Refresh**: Quick feedback during development
- **TypeScript**: Compile-time error detection
- **ESLint**: Real-time code quality feedback
- **Hot Reload**: Instant updates without losing state
