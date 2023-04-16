interface IField {
    [x: string]: any;
    _Field__id: string;
    _Field__name: string;
    _Field__description: string;
    _Field__price_by_slot: number;
    _Field__category: string;
    _Field__type: string;
    _Field__booking_slots: Slot[];
    _Field_image: string;
  }
  
  interface ISlot {
    _Slot__start_time: string;
    _Slot__end_time: string;
    _Slot__is_booked: boolean;
    _SlotDate__date: string;
  }

export interface ICreateField {
    name: string,
    description: string,
    price_by_slot: number,
    category: string,
    type: string,
}