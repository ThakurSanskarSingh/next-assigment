import { auth } from '@/auth';
import { ROUTES } from '@/constants/routes';
import { redirect } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export default async function ProtectedRoute({ 
  children, 
  fallback = ROUTES.LOGIN 
}: ProtectedRouteProps) {
  const session = await auth();
  
  if (!session) {
    redirect(fallback);
  }

  return <>{children}</>;
}
