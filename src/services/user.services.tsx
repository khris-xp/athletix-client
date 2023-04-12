import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const registerService = async (fullname: string, email: string, password: string, phone_number: string, address: string,
    birth_date: string, emergency_contact_fullname: string, emergency_contact_phone_number: string): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.post('http://localhost:4000/auth/register', {
            fullname, email, password, phone_number, address, birth_date, emergency_contact_fullname, emergency_contact_phone_number
        })
        const token: string = response.headers.authorization;
        Cookies.set('token', token);
        window.location.href = '/';
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

export const loginService = async (email: string, password: string): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.post('http://localhost:4000/auth/login', { email, password });
        const token: string = response.headers.authorization;
        Cookies.set('token', token);
        window.location.href = '/';
    } catch (err: unknown) {
        console.log(err);
    }
}

export const logoutService = async (): Promise<void> => {
    try {
        Cookies.remove('token');
        window.location.href = '/';
    } catch (err: unknown) {
        console.log(err);
    }
}

export const getUserService = async () => {
    try {
        const token: string | undefined = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response = await axios.get('http://localhost:4000/users/profile');
            return response.data;
        }
    } catch (err: unknown) {
        console.log(err);
    }
}