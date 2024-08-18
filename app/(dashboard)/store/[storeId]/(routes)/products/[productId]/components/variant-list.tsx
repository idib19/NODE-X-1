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
                        {Object.entries(variant).map(([key, value]) => (
                            key !== "quantity" && (
                                <p key={key} className="text-muted-foreground">{key}: {value}</p>
                            )
                        ))}
                        <p className="text-muted-foreground">Quantité: {variant.quantity}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default VariantList;
