"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { useFormattedCurrency } from "@/hooks/curencyhooks";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  const { format } = useFormattedCurrency();

  // Format the price field in the data array
  const formattedData: ProductColumn[] = data.map(item => ({
    ...item,
    price: format(item.price)
  }));

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Produits (${data.length})`} description="Gérer les produits de votre boutique" />
        <Button onClick={() => router.push(`/store/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter Nouveau
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedData} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
