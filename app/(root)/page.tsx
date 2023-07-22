"use client"

import { Modal } from "@/components/ui/modal"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
    return (
        <div className="p-4">

            <Modal title ="Test" description="Ceci est un test du modal" isOpen onClose={ () => {} }>
                Ici les enfants
            </Modal>

        </div>
    )
}
