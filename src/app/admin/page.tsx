import { getAllPosts } from '@/lib/posts';
import AdminDashboard from '@/containers/AdminDashboard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  const posts = await getAllPosts();

  return <AdminDashboard posts={posts} />;
}
