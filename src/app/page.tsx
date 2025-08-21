import { getAllPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import { Suspense } from 'react';



function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <svg 
            className="w-6 h-6 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 text-sm mb-4">
          {message}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

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
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      return <EmptyState />;
    }

    return (
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <ErrorDisplay 
        message="We couldn't load the blog posts. Please try again later." 
      />
    );
  }
}


export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
    
         
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Latest Posts
          </h2>
                  </div>
        
        <Suspense fallback={<BlogListingSkeleton />}>
          <BlogListing />
        </Suspense>
      </div>

     
     
    </main>
  );
}


