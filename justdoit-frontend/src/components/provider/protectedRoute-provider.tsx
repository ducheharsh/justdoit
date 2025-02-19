"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthCheck } from '@/hooks/api/auth.action';
import Loader from '../ui/loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data, isError, isLoading, isSuccess } = useAuthCheck();
    const router = useRouter()

    useEffect(() => {
        if (isError) {
            router.push('/auth'); // Redirect to login if not authenticated
        }
        if (isSuccess) {
            router.push('/dashboard'); // Redirect to app if authenticated
        }
    }, [data, isError, isSuccess, router]);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <Loader />
        </div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;