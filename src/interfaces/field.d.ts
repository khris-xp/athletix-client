interface IField {
    [x: string]: any;
    id: string;
    name: string;
    description: string;
    price_by_slot: number;
    category: string;
    type: string;
    booking_slots: Slot[];
    image: string;
  }
  
  interface ISlot {
    start_time: string;
    end_time: string;
    is_booked: boolean;
    date: string;
  }

export interface ICreateField {
    name: string,
    description: string,
    price_by_slot: number,
    category: string,
    type: string,
    image: string,
}