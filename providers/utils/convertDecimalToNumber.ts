// utils/convertPriceToNumber.ts

/**
 * Converts the `price` field from Decimal to Number in a product object.
 * @param product - The product object to convert.
 * @returns The product object with the `price` field converted to Number.
 */
export function convertPriceToNumber(product: any): any {
    if (product && product.price && typeof product.price === 'object' && product.price.constructor.name === 'Decimal') {
        return {
            ...product,
            price: Number(product.price.toString())
        };
    }

    return product;
}
