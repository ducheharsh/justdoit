// ProtectedRoute.tsx
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthCheck } from '@/hooks/api/auth.action';
import Loader from '../ui/loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isInitialized, setIsInitialized] = useState(false);
    const { isError, isLoading, isSuccess } = useAuthCheck({
        retry: false, // Prevent unnecessary retries
        staleTime: 30000, // Cache results for 30 seconds
        cacheTime: 60000, // Keep in cache for 1 minute
    });

    useEffect(() => {
        if (!isLoading && !isInitialized) {
            setIsInitialized(true);
            if (isError) {
                router.replace('/auth');
            } else if (isSuccess) {
                router.replace('/dashboard');
            }
        }
    }, [isError, isSuccess, isLoading, router, isInitialized]);

    if (isLoading || !isInitialized) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;