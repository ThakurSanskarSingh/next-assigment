import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <header className="mb-4">
        <h2 className="text-xl font-semibold mb-2 leading-tight">
          <Link
            href={`/posts/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">By {post.author}</span>
          <time dateTime={post.publishedAt} className="text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      <div className="mb-4">
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <footer className="pt-3 border-t border-gray-100">
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Read more
          <svg 
            className="ml-1 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </footer>
    </article>
  );
}