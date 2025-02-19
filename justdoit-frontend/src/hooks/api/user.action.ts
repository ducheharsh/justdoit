import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthAPI } from '@/lib/api';


export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => AuthAPI.getUser(),
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AuthAPI.signOut,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

