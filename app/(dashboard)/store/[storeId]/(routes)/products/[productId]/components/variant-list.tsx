import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';
import { Variant } from "@/types";

interface VariantListProps {
    variants: Variant[];
    onDelete: (variantId: string) => void;
}

const VariantList: React.FC<VariantListProps> = ({ variants, onDelete }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Liste des Variantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {variants.map((variant) => (
                    <Card key={variant.id} className="flex flex-col justify-between bg-transparent shadow-none border border-gray-200">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {variant.attributes?.slice(0, 2).map((attribute, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <span className="text-xs font-medium mr-2">{attribute.attributeName}:</span>
                                        {attribute.attributeName?.toLowerCase() === 'couleurs' ? (
                                            <div
                                                className="h-4 w-4 rounded-full border"
                                                style={{ backgroundColor: attribute.attributeValue }}
                                                title={attribute.attributeValue}
                                            />
                                        ) : (
                                            <span className="text-xs font-semibold">{attribute.attributeValue}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Quantité:</span>
                                    <span className="text-sm font-bold">{variant.quantity}</span>
                                </div>
                                <Progress value={(variant.quantity / 100) * 100} className="h-2" />
                            </div>
                            {variant.additionalPrice !== undefined && (
                                <p className="text-sm font-medium text-green-600 mt-4">
                                    Prix Additionnel: €{variant.additionalPrice.toFixed(2)}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-end pt-4 border-t">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 size={16} className="mr-2" /> Supprimer
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Cette action ne peut pas être annulée. Cela supprimera définitivement la variante.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(variant.id || '')}>
                                            Supprimer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default VariantList;
