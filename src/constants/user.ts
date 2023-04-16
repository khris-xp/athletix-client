import { IUserRegister, IUserChangePassword } from "@/interfaces/user";

export const UserRegisterInitialValues: IUserRegister = {
    fullname: "",
    email: "",
    phone_number: "",
    password: "",
    address: "",
    birth_date: "",
    emergency_contact_fullname: "",
    emergency_contact_phone_number: ""
}

export const UserChangePassword: IUserChangePassword = {
    old_password: "",
    new_password: "",
    confirm_new_password: ""
}