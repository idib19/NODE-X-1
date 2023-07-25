import { create } from "zustand"

interface useStoreModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

//Cette constante-fonction, permet de d'utiliser-use (fermer-ouvrir) nos ui Modal n'importe ou dans notre projet
export const useStoreModal = create<useStoreModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
})) 