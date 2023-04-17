import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { IUserChangePassword } from "@/interfaces/user";
import { IToken } from "@/interfaces/token";
import { GetServerSidePropsContext } from "next";

export const registerService = async (fullname: string, email: string, password: string, phone_number: string, address: string,
    birth_date: string, emergency_contact_fullname: string, emergency_contact_phone_number: string): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.post('http://localhost:4000/auth/register', {
            fullname, email, password, phone_number, address, birth_date, emergency_contact_fullname, emergency_contact_phone_number
        })
        const token: string = response.headers.authorization;
        Cookies.set('token', token);
        setTimeout(() => {
            window.location.href = '/';
        }, 400);
    } catch (err: unknown) {
        throw new Error('Register Failed');
    }
}

export const loginService = async (email: string, password: string): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.post('http://localhost:4000/auth/login', { email, password });
        const token: string = response.headers.authorization;
        Cookies.set('token', token);
        setTimeout(() => {
            window.location.href = '/';
        }, 400);
    } catch (err: unknown) {
        throw new Error('Login Failed');
    }
}

export const logoutService = async (): Promise<void> => {
    try {
        Cookies.remove('token');
        setTimeout(() => {
            window.location.href = '/';
        }, 400);
    } catch (err: unknown) {
        throw new Error('Logout Failed');
    }
}

export const getUserService = async () => {
    try {
        const token: string | undefined = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response: AxiosResponse = await axios.get('http://127.0.0.1:4000/users/profile');
            return response.data;
        }
    } catch (err: unknown) {
        throw new Error('Failed to fetch user');
    }
}

export const changeUserPasswordService = async (changePassword: IUserChangePassword): Promise<void> => {
    try {
        const CookiesToken = parseCookies();
        const token: string = CookiesToken.token;
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response: AxiosResponse = await axios.post('http://localhost:4000/users/change-password', changePassword);
            return response.data;
        }
    } catch (err: unknown) {
        throw new Error('Failed to change password');
    }
}

export const getUserHistoryService = async (context: GetServerSidePropsContext) => {
    try {
        const CookiesToken: IToken = parseCookies(context);
        if (CookiesToken.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${CookiesToken.token}`
            const response: AxiosResponse = await axios.get('http://127.0.0.1:4000/booking/history');
            return response.data;
        }
    } catch (err: unknown) {
        console.log(err);
    }
}