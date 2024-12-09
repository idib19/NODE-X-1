import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import ProductVariant from "./components/product-variant";
import { getVariantsForProduct } from "@/services/variantService";
import { convertPriceToNumber } from "@/providers/utils/convertDecimalToNumber";
import { getAttributesByStoreId } from "@/models/product-management/attributes/get-attribute-per-store";


const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  // Fetch the product details using service 
  const product = convertPriceToNumber(await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    }
  }));

  // Fetch the categories
  const categories = convertPriceToNumber(await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  }));

  // Fetch the variants for the product
  const variants = await getVariantsForProduct(params.productId);

  // Fetch the attributes for the store will return only sizes attributes
  const attributes = await getAttributesByStoreId(params.storeId);

  console.log(attributes);


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          initialData={product}
        />
          <ProductVariant attributes={attributes}/>
      </div>
    </div>
  );
}

export default ProductPage;
