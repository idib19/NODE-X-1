"use client";


import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

// Cet composant nous permettra de custumiser un UI-modal c'est comme le squelette de tous les modals du projet
export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
        title="Creer une boutique"
        description="Ajoute une nouvelle boutique afin de gerer les produits et les categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            Future create store form
        </Modal>
    )
}

