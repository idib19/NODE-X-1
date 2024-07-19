"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, AttributeColumn } from "./columns";

interface AttributesProps {
  data: AttributeColumn[];
}

export const AttributesClient: React.FC<AttributesProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Attributs (${data.length})`} description="Gères les attributs de tes produits" />
        <Button onClick={() => router.push(`/store/${params.storeId}/attributes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Attributes" />
      <Separator />
      <ApiList entityName="attributes" entityIdName="attributeId" />
    </>
  );
};
