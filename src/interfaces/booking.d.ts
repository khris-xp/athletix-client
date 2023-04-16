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

export interface IBookingData {
    _Booking__id: string;
    _Booking__slot: {
        _Slot__start_time: string;
        _Slot__end_time: string;
        _Slot__is_booked: boolean;
        _SlotDate__date: string;
    };
    _Booking__customer_id: string;
    _Booking__field_id: string;
    _Booking__equipments: string[];
    _Booking__payment: {
        _Payment__id: string;
        _Payment__amount: number ;
        _Payment__is_payed: boolean;
        _Payment__created_at: string;
        _PromptPayPayment__slip_image: string ;
    };
    _Booking__status: string;
    _Booking__created_at: string;
}