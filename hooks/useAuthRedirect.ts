import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export function useAuthRedirect() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)' ||
                        segments[0] === 'add-address' ||
                        segments[0] === 'pincode-check' ||
                        segments[0] === 'product-item-demo';

    if (!session && inAuthGroup) {
      router.replace('/signup');
    }
  }, [session, loading, segments]);
}
