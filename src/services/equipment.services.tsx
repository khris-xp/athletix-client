import axios, { AxiosResponse } from "axios";
import { IUpdateEquipment } from "@/interfaces/equipment";

export const getEquipmentService = async () => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/equipments`);
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
};

export const getEquipmentByIdService = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.API_URL}/equipments/${id}`);
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
}

export const createEquipmentService = async (equipment: IUpdateEquipment) => {
    try {
        const response: AxiosResponse = await axios.post(`${process.env.API_URL}/equipments/football`, equipment);
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
}

export const editEquipmentService = async (id: string, equipment: IUpdateEquipment) => {
    try {
        const response: AxiosResponse = await axios.patch(`${process.env.API_URL}/equipments/${id}`, equipment);
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
}

export const deleteEquipmentService = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`${process.env.API_URL}/equipments/${id}`);
        console.log(response.data)
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
}