import { Fragment, useState, createContext, useEffect, useContext, ReactNode } from 'react'
import { loginService, logoutService, getUserService } from '../services/user.services';
import { Loading, Error } from '@/components';
import { IUser, IAuthContext } from '@/interfaces/user';

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    isAdmin: false,
    isCustomer: false,
    isFrontDesk: false,
    isLoading: false,
    user: null,
    loginService: async () => { },
    logoutService: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCustomer, setIsCustomer] = useState<boolean>(false);
    const [isFrontDesk, setIsFrontDesk] = useState<boolean>(false);
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
                if (user?._Person__account._Account__role === 'frontdesk') {
                    setIsFrontDesk(true);
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
                isFrontDesk,
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