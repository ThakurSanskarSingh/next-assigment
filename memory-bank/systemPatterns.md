# System Patterns: Next.js Blog Architecture

## System Architecture

### App Router Structure
```
src/app/
├── layout.tsx              # Root layout with navigation
├── page.tsx               # Home page (SSR blog listing)
├── loading.tsx            # Global loading UI
├── not-found.tsx          # 404 error page
├── providers.tsx          # Client-side providers
├── actions.ts             # Server actions
├── globals.css            # Global styles
├── (auth)/
│   └── login/
│       └── page.tsx       # Login page
├── posts/
│   └── [slug]/
│       └── page.tsx       # Individual post pages (SSG)
├── admin/
│   ├── page.tsx           # Admin dashboard
│   ├── create/
│   │   └── page.tsx       # Create post page
│   └── edit/
│       └── [slug]/
│           └── page.tsx   # Edit post page
└── api/
    ├── auth/
    │   └── [...nextauth]/  # NextAuth.js API routes
    └── posts/
        ├── route.ts       # GET all posts, POST new post
        └── [slug]/
            └── route.ts   # GET, PUT, DELETE specific post
```

## Key Technical Decisions

### Component Architecture
- **Server Components**: Default for data fetching and static content
- **Client Components**: Used only when interactivity is required
- **Container Pattern**: Separate containers for complex client-side logic
- **Composition Pattern**: Small, focused components with clear responsibilities

### Data Flow Patterns
```
Data Sources → API Routes → Server Components → Client Components
     ↓              ↓              ↓               ↓
JSON Files → CRUD Operations → SSR/SSG → Interactive UI
```

### Authentication Flow
1. **Login**: NextAuth.js credentials provider
2. **Session**: JWT tokens with role-based claims
3. **Protection**: Middleware intercepts protected routes
4. **Authorization**: Role checking in components and API routes

## Design Patterns in Use

### Server-Side Patterns
- **Server Components**: Default rendering strategy for performance
- **Static Site Generation**: Pre-built pages for blog posts
- **Server Actions**: Form handling without API routes
- **Middleware**: Route protection and request interception

### Client-Side Patterns
- **Suspense Boundaries**: Loading states for async operations
- **Error Boundaries**: Graceful error handling
- **Custom Hooks**: Reusable stateful logic (useAuth)
- **Container Components**: Separation of logic and presentation

### Data Management Patterns
- **File-based Storage**: JSON files as data source
- **CRUD Operations**: Standardized data operations
- **Validation Layer**: Input validation with TypeScript
- **Cache Strategies**: Next.js built-in caching mechanisms

## Component Relationships

### Core Components
```
Navigation (Client)
├── Uses useAuth hook
├── Renders based on authentication state
└── Handles client-side navigation

BlogCard (Server)
├── Receives post data as props
├── Renders static content
└── Links to dynamic post pages

PostForm (Client)
├── Handles form state
├── Validates input data
├── Submits via Server Actions
└── Manages loading states

ProtectedRoute (Server)
├── Checks authentication
├── Redirects unauthorized users
└── Renders children for authorized users
```

### Data Flow Architecture
```
JSON Files (posts.json)
    ↓
lib/posts.ts (Data Layer)
    ↓
API Routes (api/posts/)
    ↓
Server Components (SSR/SSG)
    ↓
Client Components (Interactive UI)
```

## Critical Implementation Paths

### Blog Post Creation Flow
1. Admin navigates to `/admin/create`
2. PostForm component renders with empty state
3. User fills form and submits
4. Server Action validates and processes data
5. New post added to JSON file
6. Cache revalidation triggers
7. Redirect to admin dashboard

### Authentication Flow
1. User visits `/login`
2. Credentials submitted to NextAuth.js
3. JWT token created with user role
4. Session stored in secure cookie
5. Middleware protects subsequent requests
6. Components access session via hooks

### Static Generation Flow
1. Build process reads all posts
2. `generateStaticParams` creates route parameters
3. Each post page pre-rendered at build time
4. ISR allows updates without full rebuild
5. Cache headers optimize delivery

## Performance Optimizations

### Caching Strategy
- **Static Assets**: Long-term caching with versioning
- **API Routes**: Cache headers for GET requests
- **Page Cache**: Next.js automatic page caching
- **Component Cache**: React Server Component caching

### Loading Patterns
- **Suspense**: Streaming for better perceived performance
- **Skeleton UI**: Loading placeholders for better UX
- **Progressive Enhancement**: Core functionality works without JS
- **Code Splitting**: Automatic route-based splitting

### SEO Optimizations
- **Metadata API**: Dynamic meta tags for each page
- **Static Generation**: Pre-rendered content for crawlers
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatic sitemap generation
