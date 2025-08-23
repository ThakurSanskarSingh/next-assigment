import { getAllPosts } from '@/lib/data';
import AdminDashboard from '@/containers/AdminDashboard';

export default async function AdminPage() {
  const posts = await getAllPosts();

  return <AdminDashboard posts={posts} />;
}
