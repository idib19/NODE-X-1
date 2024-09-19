import { useMemo } from 'react';
import { createFormatter } from '@/lib/utils';
import useCurrency from "@/providers/currencyContext";

export function useFormattedCurrency() {
  const { currency } = useCurrency();
  
  const formatter = useMemo(() => createFormatter(currency), [currency]);

  const format = (value: number | string) => formatter.format(Number(value));

  return { currency, format };
}
