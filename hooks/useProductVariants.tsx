// hooks/useProductVariants.ts
import { useState, useEffect } from "react";
import { createVariantByCallingApi, getVariantsForProduct } from "@/services/productService";
import { useParams } from 'next/navigation';
import { Variant } from "@/types";

export const useProductVariants = () => {

    const productId = useParams().productId as string

    const [variants, setVariants] = useState<Variant[]>([]);
    const [newVariant, setNewVariant] = useState<Partial<Variant>>({ quantity: 1, attributes: [],  });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    useEffect(() => {
        if (productId) {

            console.log("le useffect fonctionne !!!!!")
            
            getVariantsForProduct(productId)
                .then((data) => {
                  console.log("Voici les variants retournees du serveur " + data)
                    setVariants(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false)); // Handle error
        }

    }, [productId]);

    const handleVariantChange = (field: string, value: string | number | { attributeValueId: string }) => {
        if (field === "attributes") {
          setNewVariant((prev) => ({
            ...prev,
            attributes: [...(prev.attributes || []), value as { attributeValueId: string }],
          }));
        } else {
          setNewVariant((prev) => ({
            ...prev,
            [field]: value,
          }));
        }
      };
      
      

  const handleAddVariant = async () => {
    // Ensure the attributes are in the correct format
    const variantData: Variant = {
      ...newVariant,
      quantity: typeof newVariant.quantity === "string" ? parseInt(newVariant.quantity, 10) : newVariant.quantity!,
      attributes: newVariant.attributes!,
    };

    setVariants((prev) => [...prev, variantData]);
    setNewVariant({ quantity: 1, attributes: [], });

    if (productId) {
      await createVariantByCallingApi(productId, variantData);
    }
  };

    return {
        variants,
        newVariant,
        handleVariantChange,
        handleAddVariant,
        isLoading,
    };
};
