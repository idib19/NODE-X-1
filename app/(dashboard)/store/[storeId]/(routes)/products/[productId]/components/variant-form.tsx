"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Variant, Attribute } from "@/types";

interface VariantFormProps {
  attributes: Attribute[];
  newVariant: Partial<Variant>;
  onVariantChange: (field: string, value: string | number | { attributeValueId: string }) => void;
  onAddVariant: () => void;
}

const VariantForm: React.FC<VariantFormProps> = ({ attributes, newVariant, onVariantChange, onAddVariant }) => (
  <form className="grid gap-4">
    {attributes.map((attribute) => (
      <div key={attribute.id} className="grid gap-2">
        <Label htmlFor={attribute.name.toLowerCase()}>{attribute.name}</Label>
        <Select
          onValueChange={(value) => {
            onVariantChange("attributes", { attributeValueId: value }); // Directly send the attribute ID
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder={`Sélectionnez ${attribute.name}`} />
          </SelectTrigger>
          <SelectContent>
            {attribute.values.map((attrValue) => (
              <SelectItem key={attrValue.id} value={attrValue.id}> {/* Use attribute value ID directly */}
                {attrValue.value} {/* Display the value (e.g., "M", "L"), but store the ID */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ))}
    <div className="grid gap-2">
      <Label htmlFor="quantity">Quantité</Label>
      <Input
        id="quantity"
        type="number"
        value={newVariant.quantity || 1}
        onChange={(e) => onVariantChange("quantity", parseInt(e.target.value))}
      />
    </div>
    <Button onClick={onAddVariant} type="button">Ajouter une Variante</Button>
  </form>
);

export default VariantForm;
