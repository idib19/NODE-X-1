import { Variant } from "@/types";
import { Decimal } from "@prisma/client/runtime/library";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;


interface Attribute {
  name: string;
}

interface AttributeValue {
  id: string;
  attributeId: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

interface VariantAttribute {
  id: string;
  variantId: string;
  attributeValueId: string;
  createdAt: Date;
  updatedAt: Date;
  attributeValue: AttributeValue & {
    attribute: Attribute;
  };
}

interface VariantBackEnd {
  id: string;
  productId: string;
  additionalPrice: Decimal; // Ensure Decimal is handled correctly
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface VariantBackEndWithAttributes extends VariantBackEnd {
  attributes: VariantAttribute[];
}


//  utility function to map oover vaiants and create a version adapted to the frontend
const mapVariantsBackEndToFrontEnd = (variants: VariantBackEndWithAttributes[]): Variant[] => {
  return variants.map((variant) => {
    const mappedVariant: Variant = {
      quantity: variant.stockQuantity,
      additionalPrice: Number(variant.additionalPrice), // Convert Decimal to a number
    };

    // Map attributes to dynamic keys
    variant.attributes.forEach((variantAttribute) => {
      const attributeName = variantAttribute.attributeValue.attribute.name; // Get the attribute name
      const attributeValue = variantAttribute.attributeValue.value; // Get the attribute value

      // Assign the dynamic key and value to the mapped variant object
      mappedVariant[attributeName] = attributeValue;
    });

    return mappedVariant;
  });
};



// Service function to get variants for a product
export const getVariantsForProduct = async (productId: string): Promise<Variant[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/5601a131-affb-4108-9135-38450c4918d0/products/${productId}/variants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product variants.');
    }

    const variantsBackEnd: (VariantBackEnd & { attributes: (VariantAttribute & { attributeValue: AttributeValue })[] })[] = await response.json();

    // Map each backend variant to the frontend format
    const variantsFrontEnd = mapVariantsBackEndToFrontEnd(variantsBackEnd);

    return variantsFrontEnd;
  } catch (error) {
    console.error('Error fetching variants:', error);
    return [];
  }
};

// Example function for creating a variant
export const createVariantByCallingApi = async (productId: string, variantData: Variant) => {
  try {
    const response = await fetch(`http://localhost:3000/api/5601a131-affb-4108-9135-38450c4918d0/products/${productId}/variants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variantData),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${response.statusText}. ${errorData.message || 'An unknown error occurred.'}`
      );
    }

    // Parse the JSON response
    const data = await response.json();
    return data; // Return the created variant or success message
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating variant:', error);

    // Re-throw the error so that it can be handled by the calling function/component
    throw error;
  }
};

