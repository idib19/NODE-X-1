import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Variant, Attribute } from "@/types";
import { PlusCircle } from 'lucide-react';

interface VariantFormProps {
  attributes: Attribute[];
  newVariant: Partial<Variant>;
  onVariantChange: (field: string, value: string | number, attributes: Attribute[]) => void;
  onAddVariant: () => void;
}

const VariantForm: React.FC<VariantFormProps> = ({ attributes, newVariant, onVariantChange, onAddVariant }) => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>Ajouter une Nouvelle Variante</CardTitle>
      <CardDescription>Remplissez le formulaire pour créer une nouvelle variante de produit.</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="space-y-2">
              <Label htmlFor={attribute.name.toLowerCase()} className="text-sm font-medium">
                {attribute.name}
              </Label>
              <Select
                onValueChange={(value) => {
                  onVariantChange("attributes", value, attributes);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Sélectionnez ${attribute.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {attribute.values.map((attrValue) => (
                    <SelectItem key={attrValue.id} value={attrValue.id}>
                      {attrValue.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium">Quantité</Label>
          <Input
            id="quantity"
            type="number"
            value={newVariant.quantity || 1}
            onChange={(e) => onVariantChange("quantity", parseInt(e.target.value), attributes)}
            className="w-full"
          />
        </div>
      </form>
    </CardContent>
    <CardFooter>
      <Button onClick={onAddVariant} type="button" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Variante
      </Button>
    </CardFooter>
  </Card>
);

export default VariantForm;