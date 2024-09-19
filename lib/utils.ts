import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// this is a custum function to format correctly the prices tags under the products items
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const createFormatter = (currency: string) => {
  return new Intl.NumberFormat(
    currency === 'FCFA' ? 'fr-FR' : currency === 'EUR' ? 'fr-FR' : 'en-US',
    {
      style: 'currency',
      currency: currency === 'FCFA' ? 'XOF' : currency === 'DOLLAR' ? 'USD' : currency,
      minimumFractionDigits: currency === 'FCFA' ? 0 : 2
    }
  );
};
