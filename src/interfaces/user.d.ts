export interface IUser {
  _Person__id: string;
  _Person__fullname: string;
  _Person__email: string;
  _Person__phone_number: string;
  _Person__address: string;
  _Person__birth_date: string;
  _Person__emergency_contact_fullname: string;
  _Person__emergency_contact_phone_number: string;
  _Person__account: {
    _Account__password: string;
    _Account__role: string;
  };
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  loginService: (email: string, password: string) => Promise<void>;
  logoutService: () => Promise<void>;
}