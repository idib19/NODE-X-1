

// For displaying a variant
export interface Variant {
  quantity: number;
  additionalPrice?: number;
  attributes: {
      attributeName?: string;
      attributeValue?: string;
      attributeValueId: string;
  }[];
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