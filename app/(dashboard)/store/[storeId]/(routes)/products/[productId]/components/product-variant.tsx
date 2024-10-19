// components/ProductVariant.tsx
"use client";

import React, { useState } from "react";
import VariantForm from "./variant-form";
import VariantList from "./variant-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProductVariants } from "@/hooks/useProductVariants";
import { Attribute } from "@/types";

const ProductVariant: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { variants, newVariant, handleVariantChange, handleAddVariant, handleDeleteVariant } = useProductVariants();

    const handleAddVariantAndClose = () => {
        handleAddVariant();
        setIsDialogOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
            <div className="grid gap-6">
               
                <Card>
                    <CardHeader>
                        <CardTitle>Variantes de Produit</CardTitle>
                        <CardDescription>Gérez les variantes de ce produit</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setIsDialogOpen(true)}>Ajouter une Nouvelle Variante</Button>
                    </CardContent>
                </Card>
                <VariantList
                    variants={variants}
                    onDelete={handleDeleteVariant}
                />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter une Nouvelle Variante</DialogTitle>
                        <DialogDescription>Remplissez le formulaire pour créer une nouvelle variante de produit.</DialogDescription>
                    </DialogHeader>
                    <VariantForm
                        attributes={attributes}
                        newVariant={newVariant}
                        onVariantChange={handleVariantChange}
                        onAddVariant={handleAddVariantAndClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductVariant;
