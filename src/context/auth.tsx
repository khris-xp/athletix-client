import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { getUserService } from "@/services";
import { IUser, IAuthContext } from "@/interfaces/user";

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isAdmin: false,
  isCustomer: false,
  isFrontDesk: false,
  isLoading: false,
  user: null,
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
        if (user?.account.role === "admin") {
          setIsAdmin(true);
        }
        if (user?.account.role === "frontdesk") {
          setIsFrontDesk(true);
        }
        if (user?.account.role === "customer") {
          setIsCustomer(true);
        }
        setIsLoading(false);
      } catch (err: unknown) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [user?.account.role]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isAdmin,
        isCustomer,
        isFrontDesk,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
