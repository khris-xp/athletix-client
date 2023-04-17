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

export interface IUserRegister {
  fullname: string;
  email: strin;
  password: string
  phone_number: string;
  address: string;
  birth_date: string;
  emergency_contact_fullname: string;
  emergency_contact_phone_number: string;
}

export interface IUserChangePassword {
  old_password: string;
  new_password: string;
  confirm_new_password?: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isFrontDesk: boolean;
  isLoading: boolean;
  user: IUser | null;
}