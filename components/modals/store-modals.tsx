"use client";
import axios from "axios";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" //form state management&validation for react apps
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast"
import { error } from "console";



const formSchema = z.object({
    name: z.string().min(1),
})


// Cet composant nous permettra de custumiser un UI-modal c'est comme le squelette de tous les modals du projet
export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

           
            const response  = await axios.post('/api/stores', values);

            window.location.assign(`/${response.data.id}`)
        }
        catch (error) {
            toast.error("Une erreur est survenu")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Modal
            title="Creer une boutique"
            description="Ajoute une nouvelle boutique afin de gerer les produits et les categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Boutique en Ligne" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-6 space-x-2 flex items-center justify-end">
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={storeModal.onClose} >
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}

