"use client"
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAuthCheck } from '@/hooks/api/auth.action';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data, isError, isLoading } = useAuthCheck();
    const router = useRouter()

    useEffect(() => {
        if (isError) {
            router.push('/auth'); // Redirect to login if not authenticated
        }
    }, [data, isError, router]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    return <>{children}</>;
};

export default ProtectedRoute;