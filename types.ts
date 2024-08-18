export interface Variant {
    quantity: number;
    additionalPrice: number;
    [attribute: string]: string | number
}

export interface Attribute {
    id: string;
    name: string;
    values: string[];
}