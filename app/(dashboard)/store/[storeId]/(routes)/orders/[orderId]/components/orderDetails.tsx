/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kuxXeeuETrR
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

import Currency from "@/components/ui/currency"
import { Decimal } from "@prisma/client/runtime/library"

import { ComboboxPopover } from "./statusBox"

interface OrderDetailsProps {
    order: {
        id: string;
        storeId: string;
        isPaid: boolean;
        name: string;
        phone: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        orderItems: {
            id: string;
            product: {
                id: string;
                storeId: string;
                categoryId: string;
                name: string;
                price: Decimal;
                isFeatured: boolean;
                isArchived: boolean;
                createdAt: Date;
                updatedAt: Date;
                images: {
                    id: string;
                    url: string;
                }[];
            };
            quantity: Decimal;
            size: string;
            color: string;
        }[];
    } | null;
}




export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

    // Calculate total cost using reduce()
    const totalCost = order?.orderItems?.reduce((acc, item) => {
        return acc.add(item.product.price.mul(item.quantity)); // Use Decimal methods
    }, new Decimal(0)) || new Decimal(0); // Handle absence of orderItems


    return (
        <main className="flex flex-col gap-8 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-xl">
                    Order #{order?.id} -<span className="font-normal text-gray-500 dark:text-gray-400"> {order?.name} </span>
                    <span className="font-normal text-gray-500 dark:text-gray-400">On {order?.createdAt.toDateString()}</span>
                </h1>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
                <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Produits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                                        <TableHead className="max-w-[150px]">Name</TableHead>
                                        <TableHead>Options</TableHead>
                                        <TableHead>quantité</TableHead>
                                        <TableHead>Prix</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order?.orderItems?.map((orderItem) => (
                                        <TableRow key={orderItem.id}>
                                            <TableCell className="hidden md:table-cell">
                                                <img
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={orderItem.product.images.at(0)?.url}
                                                    width="64"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{orderItem.product.name}</TableCell>
                                            <TableCell className="flex gap-x-2"> {orderItem.size}
                                                <div
                                                    className={`h-6 w-6 rounded-full border`}
                                                    style={{ backgroundColor: orderItem.color}}
                                                />
                                            </TableCell>
                                            <TableCell>{orderItem.quantity.toString()}</TableCell>
                                            <TableCell>
                                                <Currency value={orderItem.product.price.toNumber()} />
                                            </TableCell>
                                            <TableCell>
                                                <Currency value={orderItem.product.price.toNumber() * orderItem.quantity.toNumber()} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>



                        
                        <CardHeader>
                            <CardTitle>Paiement</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center">
                                <div>Total</div>
                                <div className="ml-auto">
                                    <Currency value={totalCost.toNumber()} />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div>Remise</div>
                                <div className="ml-auto">
                                    <Currency value={-0.00} />
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center font-medium">
                                <div>Total de la commande</div>
                                <div className="ml-auto"> 
                                    <Currency value={totalCost.toNumber()} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                    <Card>
                        <div>
                            <CardHeader className="flex flex-row items-center space-y-0">
                                <CardTitle>Client</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1">
                                    <span className="font-semibold">{order?.name}</span>
                                    <div>23 total orders</div>
                                </div>
                            </CardContent>
                        </div>
                        <Separator />
                        <div>
                            <CardHeader className="flex flex-row items-center space-y-0">
                                <CardTitle>Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1">
                                    <span className="">{order?.phone}</span>
                                    <div>{order?.email}</div>
                                </div>
                            </CardContent>
                        </div>
                        <Separator />
                        <div>
                            <CardHeader>
                                <CardTitle>Adresse de livraison</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div>
                                    {order?.address}
                                </div>
                            </CardContent>
                        </div>

                    </Card>

                    <Card className="flex self-start  ">
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <ComboboxPopover />
                    </Card>


                </div>
            </div>
        </main>
    )
}