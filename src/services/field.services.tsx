import axios, { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { IToken } from '@/interfaces/token';
import router from 'next/router';
import { ICreateField } from '@/interfaces/field';

export const getFieldService = async () => {
    try {
        const response: AxiosResponse = await axios.get('http://127.0.0.1:4000/fields');
        return response.data;
    } catch (err: unknown) {
        throw Error('Failed to fetch field');
    }
}

export const getFieldDetailService = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.get(`http://127.0.0.1:4000/fields/${id}`);
        return response.data;
    } catch (err: unknown) {
        throw Error('Failed to fetch field detail');
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
        throw Error('Failed to create field');
    }
}

export const editFieldService = async (field: ICreateField, id: string) => {
    try {
        const Cookies: IToken = parseCookies();
        if (Cookies.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
            const response: AxiosResponse = await axios.patch(`http://localhost:4000/fields/${id}`, field);
            router.push('/')
            return response.data;
        }
    } catch (err: unknown) {
        throw Error('Failed to edit field');
    }
}

export const deleteFieldService = async (id: string) => {
    try {
        const Cookies: IToken = parseCookies();
        if (Cookies.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
            const response: AxiosResponse = await axios.delete(`http://localhost:4000/fields/${id}`);
            return response.data;
        }
    } catch (err: unknown) {
        throw Error('Failed to delete field');
    }
}