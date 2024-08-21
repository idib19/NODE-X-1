// components/ProductVariant.tsx
"use client";

import React from "react";
import VariantForm from "./variant-form";
import VariantList from "./variant-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useProductVariants } from "@/hooks/useProductVariants";
import { Attribute } from "@/types";

const attributes: Attribute[] = [
    {
        id: "e7ca3a34-cbcf-4ab2-9c31-0fd388a55803",
        name: "Tailles",
        values: [
            { id: "48f42b15-e850-448d-99a5-894693b0aba9", name: "Moyen", value: "M" },
            { id: "ed91def4-b81e-4411-8465-7707dc5a56ae", name: "Petit", value: "S" },
            { id: "b1541a04-4b04-42ed-af93-365a45a9e1da", name: "Grand", value: "L" },
            { id: "e910330a-ac88-40e0-89bd-b6c6082f3d98", name: "Très Grand", value: "XL" },
        ]
    },
];
const ProductVariant: React.FC = () => {
    const { variants, newVariant, handleVariantChange, handleAddVariant, handleDeleteVariant } = useProductVariants();

    console.log(variants)
    
    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
            <div className="grid gap-6">
                <HeaderSection />
                <Card>
                    <CardHeader>
                        <CardTitle>Ajouter une Nouvelle Variante</CardTitle>
                        <CardDescription>Remplissez le formulaire pour créer une nouvelle variante de produit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <VariantForm
                            attributes={attributes}
                            newVariant={newVariant}
                            onVariantChange={handleVariantChange}
                            onAddVariant={handleAddVariant}
                        />
                    </CardContent>
                </Card>
                <VariantList 
                variants={variants} 
                onDelete={handleDeleteVariant}
                />
            </div>
        </div>
    );
};

const HeaderSection: React.FC = () => (
    <div>
        <h1 className="text-2xl font-bold">Variantes de Produit</h1>
        <p className="text-muted-foreground">Créez et gérez les variantes de ce produit</p>
    </div>
);

export default ProductVariant;
