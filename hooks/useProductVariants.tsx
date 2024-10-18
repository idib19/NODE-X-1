// hooks/useProductVariants.ts
import { useState, useEffect } from "react";
import { createVariantByCallingApi, deleteVariantById, getVariantsForProduct } from "@/services/variantService";
import { useParams } from 'next/navigation';
import { Variant, Attribute } from "@/types";
import { toast } from "react-hot-toast"

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
                    setVariants(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false)); // Handle error
        }

    }, [productId]);

    const handleVariantChange = (
      field: string,
      value: string | number,
      attributes: Attribute[]
    ) => {
      if (field === "attributes") {
        // Find the attribute and the selected value based on value
        const selectedAttribute = attributes.find(attr =>
          attr.values.some(val => val.id === value)
        );
    
        const selectedAttributeValue = selectedAttribute?.values.find(val =>
          val.id === value
        );
    
        if (selectedAttribute && selectedAttributeValue) {
          setNewVariant((prev) => {
            // Check if the attribute already exists and replace it
            const existingAttributes = prev.attributes || [];
            const updatedAttributes = existingAttributes.filter(
              attr => attr.attributeName !== selectedAttribute.name
            );
    
            return {
              ...prev,
              attributes: [
                ...updatedAttributes,
                {
                  attributeName: selectedAttribute.name,  // Store the attribute name
                  attributeValue: selectedAttributeValue.value,  // Store the attribute value
                  attributeValueId: value as string,  // Store the attribute value ID
                }
              ],
            };
          });
        }
      } else {
        setNewVariant((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    };
    
    
      
    const handleAddVariant = async () => {
      if (!newVariant.attributes || newVariant.attributes.length === 0) {
        toast.error("Please select at least one attribute.");
        return;
      }
    
      if (!productId) {
        toast.error("Product ID is missing. Cannot create variant.");
        return;
      }
    
      // Ensure quantity is defined and is a number
      const quantity = typeof newVariant.quantity === "string" 
        ? parseInt(newVariant.quantity, 10) 
        : newVariant.quantity;
    
      // Guard against undefined quantity
      if (quantity === undefined) {
        toast.error("Quantity is missing. Cannot create variant.");
        return;
      }
    
      // Construct variantData with the desired structure
      const variantData = {
        quantity: quantity,  // Ensure quantity is a number
        attributes: newVariant.attributes!.map(attr => ({
          attributeValueId: attr.attributeValueId,  // Include only attributeValueId
        })),
      } as Variant;
    
      setIsLoading(true);
    
      
      try {
        const createdVariantId = await createVariantByCallingApi(productId, variantData);
        
        // Append the id to variantData
        const variantWithId: Variant = {
          ...variantData,
          id: createdVariantId,  // Assign the newly created id to the variant
        };
    
        setVariants((prev) => [...prev, variantWithId]);  // Update the state with the new variant
        setNewVariant({ quantity: 1, attributes: [] });  // Reset the form
        toast.success("Variant ajouté avec succès !");
      } catch (error) {
        console.error("Error creating variant:", error);
        toast.error("Une erreur est survenue lors de la création de la variante. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    };
    
    
    
    const handleDeleteVariant = async (variantId: string) => {
      setIsLoading(true);
      try {
        await deleteVariantById(productId, variantId);
        setVariants(prev => prev.filter(variant => variant.id !== variantId));
        toast.success("Variant deleted successfully!");
      } catch (error) {
        console.error("Failed to delete variant:", error);
        toast.error("There was an error deleting the variant. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    


    return {
        variants,
        newVariant,
        handleVariantChange,
        handleAddVariant,
        handleDeleteVariant,
        isLoading,
    };
};
