import axios, { AxiosResponse } from "axios";
import { ICreateNew, IUpdateNew } from "@/interfaces/news";
import { parseCookies } from "nookies";
import router from "next/router";
import { IToken } from "@/interfaces/token";

export const getNewService = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_API}/news`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Failed to fetch news");
  }
};

export const getNewDetailService = async (newsId: string | undefined) => {
  try {
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_API}/news/${newsId}`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Failed to fetch news detail");
  }
};

export const createNewService = async (news: ICreateNew) => {
  try {
    const Cookies: IToken = parseCookies();
    if (Cookies.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
      const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/news`, news);
      router.push('/news');
      return response.data;
    }
  } catch (err: unknown) {
    throw new Error("Failed to create new");
  } 
};

export const editNewService = async (news: IUpdateNew, id: string) => {
  try {
    const Cookies: IToken = parseCookies();
    if (Cookies.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
      const response: AxiosResponse = await axios.put(`${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/news/${id}`, news);
      router.push('/news');
      return response.data;
    }
  } catch (err: unknown) {
    throw new Error("Failed to edit new");
  }
};

export const deleteNewService = async (id: string) => {
  try {
    const Cookies: IToken = parseCookies();
    if (Cookies.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.token}`;
      const response: AxiosResponse = await axios.delete(`${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/news/${id}`);
      return response.data;
    }
  } catch (err: unknown) {
    throw new Error("Failed to delete new");
  }
};
