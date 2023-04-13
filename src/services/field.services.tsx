import axios, { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { IToken } from '@/interfaces/token';
import { ICreateField } from '@/interfaces/field';

export const getFieldService = async () => {
    try {
        const response: AxiosResponse = await axios.get('http://localhost:4000/fields');
        return response.data;
    } catch (err: unknown) {
        console.log(err);
    }
}

export const createFieldService = async (field: ICreateField) => {
    try {
        const Cookies: IToken = parseCookies();
        if (Cookies.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
            const response: AxiosResponse = await axios.post('http://localhost:4000/fields', field);
            return response.data;
        }
    } catch (err: unknown) {
        console.log(err);
    }
}