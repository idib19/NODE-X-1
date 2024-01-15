/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IpJDCuMDEbX
 */
export default function OrderDetails () {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Order Details</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">Order ID</h2>
                        <p>#123456</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Order Date</h2>
                        <p>January 15, 2024</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-base font-semibold">Name</h3>
                        <p>John Doe</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Email</h3>
                        <p>johndoe@example.com</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Addresses</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-base font-semibold">Shipping Address</h3>
                        <p>123 Main St, Anytown, CA 12345</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Billing Address</h3>
                        <p>123 Main St, Anytown, CA 12345</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-base font-semibold">Order Total</h3>
                        <p>$99.99</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Order Status</h3>
                        <p>Shipped</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Items</h2>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <h3 className="text-base font-semibold">Product Name</h3>
                        <p>Awesome Product</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Quantity</h3>
                        <p>1</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Price</h3>
                        <p>$99.99</p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">Subtotal</h3>
                        <p>$99.99</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

