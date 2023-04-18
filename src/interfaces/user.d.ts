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