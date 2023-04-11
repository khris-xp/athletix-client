import React, { Fragment, useState, createContext, useEffect, useContext, ReactNode } from 'react'
import { loginService, logoutService, getUserService } from '../services/user.services';
import Loading from '@/components/Loading';

const AuthContext = createContext<any>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    loginService: () => { },
    logoutService: () => { },
});

export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserService();
                setUser(response);
                setIsLoading(false);
            } catch (err: unknown) {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                loginService,
                logoutService,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <Loading />;
    if (!isAuthenticated) {
        console.log("No Authenticated");
    };
    return <Fragment>{children}</Fragment>;
}
