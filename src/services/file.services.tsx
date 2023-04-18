import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { IToken } from "@/interfaces/token";
import { File } from "buffer";

export const uploadImageService = async (file: FormData) => {
    try {
        const CookiesToken: IToken = parseCookies();
        if (CookiesToken.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${CookiesToken.token}`;

            console.log(file);
            const response: AxiosResponse = await axios.post(
                `http://localhost:4000/upload/`,
                file
            );
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