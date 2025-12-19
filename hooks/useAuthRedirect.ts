import { useEffect } from 'react';
import { useRouter, useSegments, usePathname } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const PUBLIC_ROUTES = [
  '',
  'index',
  'signup',
  'signin',
  'signup-email',
  '+not-found'
];

export function useAuthRedirect() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0] || 'index';
    const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);
    const isProtectedRoute = !isPublicRoute;

    if (!session && isProtectedRoute) {
      router.replace('/signup');
    }
  }, [session, loading, segments, pathname]);
}
