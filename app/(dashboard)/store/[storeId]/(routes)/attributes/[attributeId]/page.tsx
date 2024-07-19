import prismadb from "@/lib/prismadb";
import { AttributeForm } from "./components/attribute-form";

const AttributePage = async ({
  params
}: {
  params: { attributeId: string }
}) => {
  const attribute = await prismadb.attribute.findUnique({
    where: {
      id: params.attributeId
    }
  });

  const attributeValues = await prismadb.attributeValue.findMany({
    where: {
      attributeId: params.attributeId
    },
    select: {
      id: true,
      name: true,
      value: true
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AttributeForm initialData={attribute} />
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <ul>
          {attributeValues.map(attributeValue => (
            <li key={attributeValue.id}>
              <strong>{attributeValue.name}:</strong> {attributeValue.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AttributePage;
