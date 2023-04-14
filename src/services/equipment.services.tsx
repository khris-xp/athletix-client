import axios, { AxiosResponse } from "axios";

export const getEquipmentService = async () => {
    try {
        const response: AxiosResponse = await axios.get(
            "http://localhost:4000/equipments"
        );
        return response.data;
    } catch (err: unknown) {
        throw Error(err as string);
    }
};