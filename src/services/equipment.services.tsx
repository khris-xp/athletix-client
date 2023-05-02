import axios, { AxiosResponse } from "axios";
import { IUpdateEquipment } from "@/interfaces/equipment";

export const getEquipmentService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_API}/equipments`
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const getEquipmentByIdService = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_API}/equipments/${id}`
    );
    return response.data;
  } catch (err: unknown) {
    throw Error(err as string);
  }
};

export const getEquipmentByCategory = async (category: string): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://localhost:4000/equipments/search/?category=${category}`
    );
    return response.data;
  } catch (err) {
    throw Error(err as string);
  }
};

export const createEquipmentService = async (equipment: IUpdateEquipment): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/equipments/football`,
      equipment
    );
    return response.data;
  } catch (err: unknown) {
    throw new Error("Failed to create equipment");
  }
};

export const editEquipmentService = async (
  id: string,
  equipment: IUpdateEquipment
): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/equipments/${id}`,
      equipment
    );
    return response.data;
  } catch (err: unknown) {
    throw new Error("Failed to edit equipment");
  }
};

export const deleteEquipmentService = async (id: string): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_POST_PUT_DELETE_API}/equipments/${id}`
    );
    return response.data;
  } catch (err: unknown) {
    throw new Error("Failed to delete equipment");
  }
};
