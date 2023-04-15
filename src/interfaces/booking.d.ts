export interface IBooking {
    field_id: string;
    slot: {
        start_time: string;
        end_time: string;
        date: string;
    }
    equipments: string[];
    payment_method: string;
}