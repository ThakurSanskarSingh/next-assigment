import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { createPostAction } from '@/app/actions';

export default async function CreatePostPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <PostForm onSubmit={createPostAction} />
        </div>
      </div>
    </div>
  );
}
