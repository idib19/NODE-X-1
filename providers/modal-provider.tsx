"use client";

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modals";



// Ce composant est comme un super-set de modal que on pourra trigger a chaque fois dont on aura besoin dans notre code
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);// Pour empecher les erreurs d'hydratation entre le serveur et le client

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    )
}  