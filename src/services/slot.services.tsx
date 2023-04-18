import axios, { AxiosResponse } from 'axios';
import { ISearchSlots } from '@/interfaces/search';

export const checkSlotBookingService = async (SearchSlot: ISearchSlots) => {

    try {
        const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_API}/search/slot/`, { params: SearchSlot });
        return response.data;
    }
    catch (err: unknown) {
        throw Error('Failed to check slot booking');

    }
}