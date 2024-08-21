"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { OrderStatusContext } from "@/providers/utils/orderStatusProvider"
import { useContext } from "react"

// Define Status as a union of string literals
type Status = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Define helper functions with Status type
const getTextColor = (status: Status): string => {
    switch (status) {
        case 'PENDING':
        case 'CANCELLED':
        case 'SHIPPED':
        case 'PROCESSING':
        case 'DELIVERED':
            return 'black';
        default:
            return 'black';
    }
};

const getBackgroundColor = (status: Status): string => {
    switch (status) {
        case 'PENDING':
            return '#d4edda'; // Light green
        case 'CANCELLED':
            return '#f8d7da'; // Light red
        case 'SHIPPED':
            return '#cce5ff'; // Light blue
        case 'PROCESSING':
            return '#fff3cd'; // Light orange
        case 'DELIVERED':
            return '#e2e3e5'; // Light gray
        default:
            return '#000000'; // Default black
    }
};

// Define statuses array with Status type for labels
const statuses: { value: string, label: Status }[] = [
    {
        value: "En attente",
        label: "PENDING",
    },
    {
        value: "traitement",
        label: "PROCESSING",
    },
    {
        value: "expédié",
        label: "SHIPPED",
    },
    {
        value: "livré",
        label: "DELIVERED",
    },
    {
        value: "annulé",
        label: "CANCELLED",
    },
]

export function ComboboxPopover() {
    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)

    const { orderStatus, handleStatusChange } = useContext(OrderStatusContext)

    return (
        <div className="flex items-center space-x-4 p-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start"
                        style={{
                            backgroundColor: selectedStatus ? getBackgroundColor(selectedStatus) : '#FF000080',
                            color: selectedStatus ? getTextColor(selectedStatus) : '#000000'
                        }}
                    >
                        {orderStatus ? <>{orderStatus}</> : <>PENDING</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            handleStatusChange(status.label)
                                            setOpen(false)
                                            setSelectedStatus(status.label); // Update selected status
                                        }}
                                        style={{
                                            color: getTextColor(status.label),
                                            backgroundColor: getBackgroundColor(status.label),
                                            padding: '5px', // Add padding for better appearance
                                            marginInline: '15px',
                                            borderRadius: '5px', // Optional: rounded corners
                                        }}
                                    >
                                        {status.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
