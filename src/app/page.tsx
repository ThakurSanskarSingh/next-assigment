import { Suspense } from 'react';
import { BlogPost } from '@/types/blog';
import ClientHomePage from '@/containers/ClientHomePage';
import { getAllPosts } from '@/lib/posts';

import ErrorDisplay from '@/components/ErrorDisplay';

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No blog posts yet
        </h3>
        <p className="text-gray-600 mb-4">
          Check back soon for new content, or create your first post!
        </p>
      </div>
    </div>
  );
}
function BlogListingSkeleton() {
  return (
    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </section>
  );
}

async function BlogListing() {
  // Posts are now fetched in HomePage and passed to ClientHomePage
  // BlogListing is primarily for rendering and error display
  // The actual posts will be managed by ClientHomePage's state
  return null; // ClientHomePage will render the posts
}


export default async function HomePage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts in HomePage:', error);
    // Optionally handle this error more gracefully, e.g., by showing a global error message
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Latest Posts
          </h2>
        </div>
        
        <Suspense fallback={<BlogListingSkeleton />}>
          {/* Fetch posts directly in HomePage to pass to ClientHomePage and BlogListing */}
          {/* This ensures posts are available for both server and client components */}
          {/* The actual fetching logic is still within BlogListing for error handling and empty state */}
          <ClientHomePage initialPosts={posts}>
            <BlogListing />
          </ClientHomePage>
        </Suspense>
      </div>
    </main>
  );
}


