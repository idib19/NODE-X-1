// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/x8I5t3IjeXH
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

// export default function Component() {
//     const [variants, setVariants] = useState([
//         {
//             id: 1,
//             name: "Black T-Shirt",
//             sku: "TSHIRT-BLK",
//             price: 19.99,
//             image: "/placeholder.svg",
//             size: "M",
//             quantity: 10,
//         },
//         {
//             id: 2,
//             name: "White T-Shirt",
//             sku: "TSHIRT-WHT",
//             price: 19.99,
//             image: "/placeholder.svg",
//             size: "L",
//             quantity: 8,
//         },
//         {
//             id: 3,
//             name: "Blue Hoodie",
//             sku: "HOODIE-BLU",
//             price: 39.99,
//             image: "/placeholder.svg",
//             size: "XL",
//             quantity: 5,
//         },
//     ])
//     const [newVariant, setNewVariant] = useState({
//         name: "",
//         sku: "",
//         price: 0,
//         image: null,
//         size: "",
//         quantity: 0,
//     })
//     const handleInputChange = (e) => {
//         setNewVariant({
//             ...newVariant,
//             [e.target.name]: e.target.value,
//         })
//     }
//     const handleImageChange = (e) => {
//         setNewVariant({
//             ...newVariant,
//             image: e.target.files[0],
//         })
//     }
//     const handleAddVariant = () => {
//         setVariants([
//             ...variants,
//             {
//                 id: variants.length + 1,
//                 ...newVariant,
//             },
//         ])
//         setNewVariant({
//             name: "",
//             sku: "",
//             price: 0,
//             image: null,
//             size: "",
//             quantity: 0,
//         })
//     }
//     const handleEditVariant = (id) => { }
//     const handleDeleteVariant = (id) => {
//         setVariants(variants.filter((variant) => variant.id !== id))
//     }
//     return (
//         <div className="grid gap-6 md:gap-8">
//             <div className="flex items-center justify-between">
//                 <h1 className="text-2xl font-bold tracking-tight">Product Variants</h1>
//                 <Button size="sm" onClick={handleAddVariant}>
//                     Add Variant
//                 </Button>
//             </div>
//             <div className="grid gap-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>New Variant</CardTitle>
//                         <CardDescription>Fill out the form to add a new product variant.</CardDescription>
//                     </CardHeader>
//                     <CardContent className="grid gap-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input id="name" name="name" value={newVariant.name} onChange={handleInputChange} />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="sku">SKU</Label>
//                                 <Input id="sku" name="sku" value={newVariant.sku} onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="price">Price</Label>
//                                 <Input id="price" name="price" type="number" value={newVariant.price} onChange={handleInputChange} />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="image">Image</Label>
//                                 <Input id="image" name="image" type="file" onChange={handleImageChange} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="size">Size</Label>
//                                 <Select id="size" name="size" value={newVariant.size} onValueChange={handleInputChange}>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select size" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="S">Small</SelectItem>
//                                         <SelectItem value="M">Medium</SelectItem>
//                                         <SelectItem value="L">Large</SelectItem>
//                                         <SelectItem value="XL">Extra Large</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="quantity">Quantity</Label>
//                                 <Input
//                                     id="quantity"
//                                     name="quantity"
//                                     type="number"
//                                     value={newVariant.quantity}
//                                     onChange={handleInputChange}
//                                 />
//                             </div>
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button onClick={handleAddVariant}>Add Variant</Button>
//                     </CardFooter>
//                 </Card>
//                 <div className="border shadow-sm rounded-lg">
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Image</TableHead>
//                                 <TableHead>Name</TableHead>
//                                 <TableHead>SKU</TableHead>
//                                 <TableHead>Price</TableHead>
//                                 <TableHead>Size</TableHead>
//                                 <TableHead>Quantity</TableHead>
//                                 <TableHead>Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {variants.map((variant) => (
//                                 <TableRow key={variant.id}>
//                                     <TableCell>
//                                         <img
//                                             src="/placeholder.svg"
//                                             width="64"
//                                             height="64"
//                                             alt={variant.name}
//                                             className="aspect-square rounded-md object-cover"
//                                         />
//                                     </TableCell>
//                                     <TableCell>{variant.name}</TableCell>
//                                     <TableCell>{variant.sku}</TableCell>
//                                     <TableCell>${variant.price.toFixed(2)}</TableCell>
//                                     <TableCell>{variant.size}</TableCell>
//                                     <TableCell>{variant.quantity}</TableCell>
//                                     <TableCell>
//                                         <div className="flex items-center gap-2">
//                                             <Button size="icon" variant="outline" onClick={() => handleEditVariant(variant.id)}>
//                                                 <FilePenIcon className="h-4 w-4" />
//                                             </Button>
//                                             <Button size="icon" variant="outline" onClick={() => handleDeleteVariant(variant.id)}>
//                                                 <TrashIcon className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function FilePenIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
//             <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//             <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
//         </svg>
//     )
// }


// function TrashIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M3 6h18" />
//             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//         </svg>
//     )
// }