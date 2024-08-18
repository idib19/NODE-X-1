// hooks/useProductVariants.ts
import { useState, useEffect } from "react";
import { createVariantByCallingApi } from "@/services/productService";
import { useSearchParams } from 'next/navigation';

interface Variant {
    [key: string]: string | number;
    quantity: number;
    additionalPrice: number;
}

export const useProductVariants = () => {
    const queryParams = useSearchParams();
    const productId = queryParams.get('productId');
    
    const [variants, setVariants] = useState<Variant[]>([]);
    const [newVariant, setNewVariant] = useState<Partial<Variant>>({ quantity: 1, additionalPrice: 0 });
    
    const handleVariantChange = (field: string, value: string | number) => {
        setNewVariant((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    
    const handleAddVariant = async () => {
        const variantData: Variant = {
            ...newVariant,
            quantity: typeof newVariant.quantity === "string" ? parseInt(newVariant.quantity, 10) : newVariant.quantity!,
            additionalPrice: typeof newVariant.additionalPrice === "string" ? parseFloat(newVariant.additionalPrice) : newVariant.additionalPrice!,
        };
        
        setVariants((prev) => [...prev, variantData]);
        setNewVariant({ quantity: 1, additionalPrice: 0 });
        
        if (productId && typeof productId === 'string') {
            await createVariantByCallingApi(productId, variantData);
        }
    };

    return {
        variants,
        newVariant,
        handleVariantChange,
        handleAddVariant
    };
};
