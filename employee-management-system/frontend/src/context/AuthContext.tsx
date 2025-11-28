import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { client } from '../apollo/client';
import { gql } from '@apollo/client';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Verify token by fetching current user
                    const { data } = await client.query({
                        query: gql`
              query Me {
                me {
                  id
                  email
                  role
                }
              }
            `,
                        fetchPolicy: 'network-only'
                    });

                    if (data.me) {
                        setUser(data.me);
                        setToken(storedToken);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
        // Reset store to clear any cached data from previous user
        client.resetStore();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        client.resetStore();
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'admin',
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
