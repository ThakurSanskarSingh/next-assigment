import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getAdjacentPosts(params.slug);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href={ROUTES.HOME}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Home
      </Link>
      
      <article className="bg-white rounded-lg shadow-md p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span>By {post.author}</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="ml-4">
                  {paragraph.replace('- ', '')}
                </li>
              );
            }
            if (paragraph.trim()) {
              return (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Post Navigation */}
      {(previous || next) && (
        <nav className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            {previous ? (
              <Link
                href={`/posts/${previous.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">Previous Post</div>
                  <div className="font-medium">{previous.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            
            {next ? (
              <Link
                href={`/posts/${next.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group text-right"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Next Post</div>
                  <div className="font-medium">{next.title}</div>
                </div>
                <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
