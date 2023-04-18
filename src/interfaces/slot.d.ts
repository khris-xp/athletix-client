export interface ISlots {
    id: string,
    start_time: string,
    end_time: string,
    start_time_value: number,
    end_time_value: number
    is_booked: boolean
}

export interface ISlotTime {
    date: string,
    end_time: string,
    is_booked: boolean,
    start_time: string
}