import prismadb from "@/lib/prismadb";
import { Decimal } from "@prisma/client/runtime/library";

const createVariant = async ({
  productId,
  additionalPrice,
  stockQuantity,
  attributeValueId
}: {
  productId: string,
  additionalPrice: Decimal,
  stockQuantity: number,
  attributeValueId: string
}) => {
  const newVariant = await prismadb.variant.create({
    data: {
      productId,
      additionalPrice,
      stockQuantity,
      attributes: {
        create: {
          attributeValue: {
            connect: { id: attributeValueId }
          }
        }
      }
    },
    include: {
      attributes: true
    }
  });

  return newVariant;
}



// Example usage
// const newVariant = await createVariant({
//   productId: "example-product-id",
//   sku: "example-sku",
//   additionalPrice: new Decimal(10.0),
//   stockQuantity: 100,
//   attributeValueId: "attribute-value-id-1"
// });

// console.log(newVariant);
