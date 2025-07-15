
'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, Rocket } from 'lucide-react';

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's a user, redirect to the dashboard.
    // This handles cases where the user is already logged in and revisits the login page.
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" role="img" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.132,44,30.022,44,24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );

  // While loading auth state, or if we're about to redirect, show a loader.
  if (loading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Otherwise, show the login page for a user who is not logged in.
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
            <Rocket className="h-12 w-12 text-primary transition-transform duration-300 hover:scale-110" />
            <h1 className="font-headline text-5xl font-bold tracking-tight text-primary-foreground transition-colors hover:text-primary md:text-6xl">
              Eventra
            </h1>
        </div>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Your ultimate gateway to events across India. Discover, create, and manage your event experiences seamlessly.
        </p>
      </div>
      <div className="mt-12">
        <Button onClick={signInWithGoogle} size="lg" className="bg-white text-gray-800 hover:bg-gray-200 shadow-lg">
          <GoogleIcon />
          Sign in with Google
        </Button>
      </div>
    </main>
  );
}
