// components/ProductVariant.tsx
"use client";

import React from "react";
import VariantForm from "./variant-form";
import VariantList from "./variant-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useProductVariants } from "@/hooks/useProductVariants";
import { Attribute } from "@/types";

const attributes: Attribute[] = [
    { id: "1", name: "Taille", values: ["S", "M", "L", "XL"] },
];

const ProductVariant: React.FC = () => {
    const { variants, newVariant, handleVariantChange, handleAddVariant } = useProductVariants();

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
                <VariantList variants={variants} />
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
