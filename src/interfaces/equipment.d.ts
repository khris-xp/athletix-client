export interface IEquipment {
  id: string;
  name: string;
  price_per_unit: number;
  quantity: number;
  category: string;
}

export interface IUpdateEquipment {
  name: string;
  price_per_unit: number;
  quantity: number;
  category: string;
}
