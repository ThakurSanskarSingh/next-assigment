'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { ROUTES, getPostViewRoute, getPostEditRoute } from '@/constants/routes';
import { deletePostAction } from '@/app/actions';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
}

interface AdminDashboardProps {
  posts: Post[];
}

export default function AdminDashboard({ posts }: AdminDashboardProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(slug);
      try {
        const result = await deletePostAction(slug);
        if (!result.success) {
          alert(result.message || 'Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post');
      } finally {
        setIsDeleting(null);
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          href={ROUTES.ADMIN_CREATE_POST}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Post
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Manage Posts</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {post.excerpt}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={getPostViewRoute(post.slug)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <Link
                      href={getPostEditRoute(post.slug)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(post.slug)}
                      disabled={isDeleting === post.slug}
                    >
                      {isDeleting === post.slug ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
