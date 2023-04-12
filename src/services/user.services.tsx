import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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