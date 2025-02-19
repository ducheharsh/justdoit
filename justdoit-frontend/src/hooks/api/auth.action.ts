import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize auth state when the app loads
    AuthAPI.initializeAuth();
    AuthAPI.checkAuth().then(setIsAuthenticated);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated
  };
};


interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  username: string;
}

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) => AuthAPI.signIn(credentials),
    onSuccess: () => {
      setIsAuthenticated(true);
      
      // Optionally refetch user data or other authenticated queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (credentials: SignUpCredentials) => AuthAPI.signUp(credentials),
    onSuccess: (data) => {
      if (data.token) {
        setIsAuthenticated(true);
        // Optionally refetch user data or other authenticated queries
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: AuthAPI.signOut,
    onSuccess: () => {
      setIsAuthenticated(false);
      // Clear all queries from the cache
      queryClient.clear();
    },
  });
}

export const useAuthCheck = (options = {}) => {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: AuthAPI.checkAuth,
        ...options
    });
};