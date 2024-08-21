

// For displaying a variant
export interface Variant {
  id?: string;  // New id field
  quantity: number;
  attributes: {
    attributeName: string;
    attributeValue: string;
    attributeValueId: string;
  }[];
  additionalPrice?: number;
}


export interface Attribute {
    id: string;
    name: string;
    values: AttributeValue[];
  }
  
  export interface AttributeValue {
    id: string;
    name: string;
    value: string;
  }