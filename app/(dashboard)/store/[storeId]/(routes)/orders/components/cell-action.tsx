"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import { AlertModal } from "@/components/modals/alert-modals";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  // Use React Query for better mutation handling
  const { mutate: deleteOrder, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/${params.storeId}/orders/${data.id}`);
    },
    onSuccess: () => {
      toast.success('Commande supprime.');
      setOpen(false);
      // Use setTimeout to prevent immediate state updates
      setTimeout(() => {
        router.refresh();
      }, 100);
    },
    onError: () => {
      toast.error('Une erreur est survenue');
    }
  });

  // Debounce the confirmation handler
  const debouncedOnConfirm = useCallback(
    debounce(() => {
      deleteOrder();
    }, 300),
    [deleteOrder]
  );

  const onConfirm = async () => {
    if (!isPending) {
      debouncedOnConfirm();
    }
  };

  // Configure toast with options to prevent excessive re-renders
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    toast(message, {
      duration: 2000,
      position: 'top-center',
      // Prevent multiple toasts from stacking
      id: 'order-action-toast',
    });
  }, []);

  const onCopy = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
    showToast('Id de commande copiée dans le presse papier.', 'success');
  }, [showToast]);

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/store/${params.storeId}/orders/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Supprimer
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
