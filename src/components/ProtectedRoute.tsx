import { auth } from '@/auth';
import { redirect } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export default async function ProtectedRoute({ 
  children, 
  fallback = '/login' 
}: ProtectedRouteProps) {
  const session = await auth();
  
  if (!session) {
    redirect(fallback);
  }

  return <>{children}</>;
}
