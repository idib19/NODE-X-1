import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Variant } from "@/types";

interface VariantListProps {
    variants: Variant[];
    onDelete: (variantId: string) => void;  // Add this prop
}

const VariantList: React.FC<VariantListProps> = ({ variants, onDelete }) => (
    <div>
        <h2 className="text-xl font-bold">Liste des Variantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {variants.map((variant) => (
                <Card key={variant.id}>
                    <CardContent>
                        {variant.attributes?.map((attribute, idx) => (
                            <p key={idx} className="text-muted-foreground">
                                {attribute.attributeName}: {attribute.attributeValue} {/* Render individual properties */}
                            </p>
                        ))}
                        <p className="text-muted-foreground">Quantité: {variant.quantity}</p>
                        {variant.additionalPrice !== undefined && (
                            <p className="text-muted-foreground">Prix Additionnel: {variant.additionalPrice}</p>
                        )}
                        <Button 
                          onClick={() => onDelete(variant.id!)}  // Pass the id to the delete handler
                          variant="destructive"
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);


export default VariantList;
