import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Variant } from "@/types";

interface VariantListProps {
    variants: Variant[];
}

const VariantList: React.FC<VariantListProps> = ({ variants }) => (
    <div>
        <h2 className="text-xl font-bold">Liste des Variantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {variants.map((variant, index) => (
                <Card key={index}>
                    <CardContent>
                        {variant.attributes?.map((attribute, idx) => (
                            <p key={idx} className="text-muted-foreground">
                                {attribute.attributeName ? `${attribute.attributeName}: ` : ""}
                                {attribute.attributeValue}
                            </p>
                        ))}
                        <p className="text-muted-foreground">Quantité: {variant.quantity}</p>
                        {variant.additionalPrice !== undefined && (
                            <p className="text-muted-foreground">Prix Additionnel: {variant.additionalPrice}</p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default VariantList;
