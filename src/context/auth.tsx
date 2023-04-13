import { Fragment, useState, createContext, useEffect, useContext, ReactNode } from 'react'
import { loginService, logoutService, getUserService } from '../services/user.services';
import Loading from '@/components/Loading';
import { IUser } from '@/interfaces/user';
import { IAuthContext } from '@/interfaces/user';
import { NextRouter, useRouter } from 'next/router';
import Error from '@/components/Error';

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    loginService: async () => { },
    logoutService: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserService();
                setUser(response);
                setIsLoading(false);
            } catch (err: unknown) {
                setIsLoading(false);
            }
        };
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
        </AuthContext.Provider >
    );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);

export const ProtectRoute = ({ children }: { children: ReactNode }) => {
    const Router: NextRouter = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        <Loading />
    };
    if (!isAuthenticated) {
        return <Error />
    }
    return <Fragment>{children}</Fragment>;
};
