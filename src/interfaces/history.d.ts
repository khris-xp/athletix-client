export interface IHistory {
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
    id: string;
    name: string;
  };
  equipments: {
    id: string;
    name: string;
    quantity: number;
  }[];
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
