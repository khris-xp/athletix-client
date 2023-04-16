export interface IEquipment {
  _Equipment__id: string;
  _Equipment__name: string;
  _Equipment__price_per_unit: number;
  _Equipment__quantity: number;
  _Equipment__category: string;
}

export interface IUpdateEquipment {
  name: string;
  price_per_unit: number;
  quantity: number;
  category: string;
}
