export interface IBooking {
    field_id: string;
    slot: {
        start_time: string;
        end_time: string;
        date: string;
    }
    equipments: any[];
    payment_method: string;
}

export interface IBookingData {
    id: string;
    slot: {
        start_time: string;
        end_time: string;
        is_booked: boolean;
        date: string;
    };
    customer: {
        id: string;
        fullname: string;
    };
    field: {
        id: string
        name: string;
    };
    equipments: string[];
    payment: {
        id: string;
        amount: number;
        is_payed: boolean;
        created_at: string;
        slip_image: string;
    };
    status: string;
    created_at: string;
}