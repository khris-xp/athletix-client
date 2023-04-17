export interface ISlots {
    id: string,
    start_time: string,
    end_time: string,
    start_time_value: number,
    end_time_value: number
    is_booked: boolean
}

export interface ISlotTime {
    _SlotDate__date: string,
    _Slot__end_time: string,
    _Slot__is_booked: boolean,
    _Slot__start_time: string
}