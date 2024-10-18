"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';


// Define the context data structure
const CurrencyContext = createContext({
    currency: 'FCFA', // Default currency
    setCurrency: (currency: string) => { }
});

export default function useCurrency() {
    const context = useContext(CurrencyContext);

    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}

interface CurrencyProviderProps {
    children: React.ReactNode;
    storeId: string;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children, storeId }) => {
    const [currency, setCurrency] = useState('FCFA');

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/devise`

    // Load the store's default currency from the API or local storage when the app initializes
    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const storeCurrency = await fetch(URL).then(res => res.json());
                setCurrency(storeCurrency.currency);
            } catch (error) {
                console.error('Failed to fetch store currency:', error);
            }
        };

        fetchCurrency();
    }, [storeId]);

    return (
        <>
            <CurrencyContext.Provider value={{ currency, setCurrency }}>
                {children}
            </CurrencyContext.Provider>
        </>

    );
};
