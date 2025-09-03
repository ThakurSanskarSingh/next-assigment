import { getAllPosts } from '@/lib/posts';
import AdminDashboard from '@/containers/AdminDashboard';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const posts = await getAllPosts();

  return <AdminDashboard posts={posts} />;
}
