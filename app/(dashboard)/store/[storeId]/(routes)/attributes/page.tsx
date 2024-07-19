import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AttributeColumn } from "./components/columns"
import { AttributesClient } from "./components/client";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  // violation of the de dependency inversion principle DIP 
  // source code dependencies should not refer to concrete modules 
  const attributes = await prismadb.attribute.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // 
  const formattedAttributes: AttributeColumn[] = attributes.map((item) => ({
    id: item.id,
    name: item.name,
    // value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AttributesClient data={formattedAttributes} />
      </div>
    </div>
  );
};

export default SizesPage;
