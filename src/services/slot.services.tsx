import axios, { AxiosResponse } from 'axios';

import { ISearchSlots } from '@/interfaces/search';

export const checkSlotBookingService = async (SearchSlot: ISearchSlots) => {
    
    try {
        const response: AxiosResponse = await axios.get('http://127.0.0.1:4000/search/slot', { params: SearchSlot});
        return response.data;
        }
    catch (err: unknown) {
        throw Error('Failed to check slot booking');
    
    }
}