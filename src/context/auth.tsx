import { Fragment, useState, createContext, useEffect, useContext, ReactNode } from 'react'
import { loginService, logoutService, getUserService } from '../services/user.services';
import { Loading, Error } from '@/components';
import { IUser, IAuthContext } from '@/interfaces/user';

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
    user: null,
    loginService: async () => { },
    logoutService: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <Loading />
    };
    if (!isAuthenticated) {
        return <Error />
    }
    return <Fragment>{children}</Fragment>;
};

export const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    if (isLoading) {
        return <Loading />
    }
    if (!isAdmin || !isAuthenticated) {
        return <Error />
    }
    return <Fragment>{children}</Fragment>;
}