"use client"
// High level imports-system imports
import { useState } from "react";
import * as z from "zod" // z from "zod" est une librairie de validation de donnees pour js et tsx en temps reel
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

//Components 
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modals";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/ImageUpload";

// cette variable est un objet de zod et elle permet de definir le type de donnees pour le formulaire (type, longueur etc...)
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

// formschema est passe a la variable BillboardFormValues avec zod.infer
type BillboardFormValues = z.infer<typeof formSchema>;

// interface typescript : 
interface BillboardFormProps {
    initialData: Billboard | null;
}


// Ce composant represente le UI en tant que tel avec les differents imports de chadcn pour notre formulaire

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billbord" : "Create billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });
    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(`/api/${params.storeId}/${params.billboardId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }

            router.refresh();
            toast.success(toastMessage)
        }
        catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh();
            router.push('/')
            toast.success("Billboard deleted.")
        }
        catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.")
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    }



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {initialData &&
                    (
                        <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )
                }



            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Background Image </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Label </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit" >
                        {action}
                    </Button>

                </form>
            </Form>

            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>

    )
} 