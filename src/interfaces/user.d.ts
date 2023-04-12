export interface IUser {
    id: string;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    birth_date: string;
    emergency_contact_fullname: string;
    emergency_contact_phone_number: string;
    account: {
      password: string;
      role: string;
    };
}

export interface IAuthContext {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: IUser | null;
    loginService: (email: string, password: string) => Promise<void>;
    logoutService: () => Promise<void>;
}