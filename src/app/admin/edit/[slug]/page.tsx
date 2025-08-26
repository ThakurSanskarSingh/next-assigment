import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { updatePostAction } from '@/app/actions';
import { getPostBySlug } from '@/lib/posts';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  // Check authentication on server side
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const handleSubmit = async (formData: FormData) => {
    'use server';
    return updatePostAction(slug, formData);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post: {post.title}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <PostForm post={post} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
