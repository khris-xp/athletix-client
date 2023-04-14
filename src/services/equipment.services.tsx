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

export const deleteEquipmentService = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`http://localhost:4000/equipments/${id}`);
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err);
    }
}