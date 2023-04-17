import axios, { AxiosResponse } from "axios";
import { IUpdateEquipment } from "@/interfaces/equipment";

export const getEquipmentService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      'http://127.0.0.1:4000/equipments'
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const getEquipmentByIdService = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://127.0.0.1:4000/equipments/${id}`
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const createEquipmentService = async (equipment: IUpdateEquipment) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:4000/equipments/football",
      equipment
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const editEquipmentService = async (
  id: string,
  equipment: IUpdateEquipment
) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `http://localhost:4000/equipments/${id}`,
      equipment
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const deleteEquipmentService = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `http://localhost:4000/equipments/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};
