# Project Brief: Next.js Blog Assignment

## Core Requirements
A full-stack blog application built with Next.js 15 demonstrating modern web development patterns including:

### Primary Features
- **Blog System**: Complete CRUD operations for blog posts
- **Authentication**: Secure login system with role-based access
- **Admin Dashboard**: Protected admin interface for content management
- **Server-Side Rendering**: SSR for home page with blog listings
- **Static Site Generation**: SSG for individual blog post pages
- **API Routes**: RESTful endpoints for data operations

### Technical Requirements
- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5 with credentials provider
- **Styling**: Tailwind CSS for responsive design
- **TypeScript**: Full type safety throughout application
- **Data**: JSON-based mock data with file system operations
- **Middleware**: Route protection for admin areas

### Key Constraints
- No external database - use JSON file storage
- Demo authentication (admin@example.com / admin123)
- Must demonstrate both SSR and SSG patterns
- Client and server component separation
- Proper error handling and loading states

### Success Criteria
- Functional blog with create, read, update, delete operations
- Secure admin area accessible only to authenticated users
- Responsive design working across devices
- Fast loading with proper caching strategies
- Clean, maintainable code structure

## Project Structure
Following Next.js 15 App Router conventions with clear separation of concerns:
- `/src/app` - App Router pages and layouts
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and data operations
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks
- `/memory-bank` - Project documentation and context
