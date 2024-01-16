/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kuxXeeuETrR
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { Order, OrderItem } from "@prisma/client"

interface OrderDetailsProps {
    order : Order & {
        orderItems: OrderItem[];
      } | null;
};

export const OrderDetails2 : React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <main className="flex flex-col gap-8 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-xl">
                    Order #3102 -<span className="font-normal text-gray-500 dark:text-gray-400"> {order?.name} </span>
                    <span className="font-normal text-gray-500 dark:text-gray-400">on June 23, 2024</span>
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
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="hidden md:table-cell">
                                            <img
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src="/placeholder.svg"
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">Glimmer Lamps</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>$60.00</TableCell>
                                        <TableCell>$120.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden md:table-cell">
                                            <img
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src="/placeholder.svg"
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">Aqua Filters</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>$49.00</TableCell>
                                        <TableCell>$147.00</TableCell>
                                    </TableRow>
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
                                <div>Subtotal</div>
                                <div className="ml-auto">$267.00</div>
                            </div>
                            <div className="flex items-center">
                                <div>Discount</div>
                                <div className="ml-auto">-$20.00</div>
                            </div>
                            <Separator />
                            <div className="flex items-center font-medium">
                                <div>Total</div>
                                <div className="ml-auto">$247.00</div>
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
                                    <div>client@gmail.com</div>
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
                        <Separator />
                        <div>
                            <CardHeader>
                                <CardTitle>Methode de payement</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div>Credit Card ending in 1234</div>
                            </CardContent>
                        </div>
                    </Card>
                    <Button className="self-start" size="lg">
                        Track Order
                    </Button>
                </div>
            </div>
        </main>
    )
}