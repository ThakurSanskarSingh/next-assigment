import { getAllPosts } from '@/lib/data';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Personal Blog Platform
        </h1>
        <p className="text-xl text-gray-600">
          Exploring modern web development with Next.js
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-3">
              <Link 
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            {post.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}