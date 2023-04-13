import { Fragment, useState, createContext, useEffect, useContext, ReactNode } from 'react'
import { loginService, logoutService, getUserService } from '../services/user.services';
import { Loading, Error } from '@/components';
import { IUser, IAuthContext } from '@/interfaces/user';

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    isAdmin: false,
    isCustomer: false,
    isLoading: false,
    user: null,
    loginService: async () => { },
    logoutService: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCustomer, setIsCustomer] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserService();
                setUser(response);
                if (user?._Person__account._Account__role === 'admin') {
                    setIsAdmin(true);
                }
                if (user?._Person__account._Account__role === 'customer') {
                    setIsCustomer(true);
                }
                setIsLoading(false);
            } catch (err: unknown) {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [user?._Person__account._Account__role]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isAdmin,
                isCustomer,
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

export const CustomerRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading, isCustomer } = useAuth();
    if (isLoading) {
        return <Loading />
    }
    if (!isCustomer && !isAuthenticated) {
        return <Error />
    }
    return <Fragment>{children}</Fragment>;
}

export const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    if (isLoading) {
        return <Loading />
    }
    if (!isAdmin && !isAuthenticated) {
        return <Error />
    }
    return <Fragment>{children}</Fragment>;
}