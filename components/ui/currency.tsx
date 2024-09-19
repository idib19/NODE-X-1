"use client";

import { useEffect, useState, useMemo } from "react";
import useCurrency from "@/providers/currencyContext";

const Currency: React.FC<CurrencyProps> = ({
    value = 0
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const { currency } = useCurrency();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const formatter = useMemo(() => {
        return new Intl.NumberFormat(
            currency === 'FCFA' ? 'fr-FR' : currency === 'EUR' ? 'fr-FR' : 'en-US',
            {
                style: 'currency',
                currency: currency === 'FCFA' ? 'XOF' : currency === 'DOLLAR' ? 'USD' : currency,
                minimumFractionDigits: currency === 'FCFA' ? 0 : 2
            }
        );
    }, [currency]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    );
}

interface CurrencyProps {
    value?: string | number;
}

export default Currency;