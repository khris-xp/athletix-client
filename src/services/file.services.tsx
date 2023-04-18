import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { IToken } from "@/interfaces/token";

export const uploadImageService = async (file: FormData) => {
    try {
        const CookiesToken: IToken = parseCookies();
        if (CookiesToken.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${CookiesToken.token}`;
            const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/upload/`, file);
            return response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw Error(err.response?.data?.detail || 'Failed to create file');
        } else {
            throw Error('Failed to create file');
        }
    }
}