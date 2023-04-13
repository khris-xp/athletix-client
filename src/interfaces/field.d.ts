export interface IField {
    _Field__id: string;
    _Field__name: string;
    _Field__description: string;
    _Field__price_by_slot: number;
    _Field__category: string;
    _Field__type: string;
}

export interface ICreateField {
    name: string,
    description: string,
    price_by_slot: string,
    category: string,
    type: string,
}