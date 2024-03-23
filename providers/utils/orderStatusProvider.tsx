"use client"

import { useState, useEffect, createContext } from 'react';
import { useParams } from 'next/navigation'

interface DefaultOrderStatus {
  orderStatus: String;
  handleStatusChange: (newStatus: string) => Promise<void>;
}

interface OrderStatusData {
  status: String;
}
// Use a more appropriate type for the context value:
export const OrderStatusContext = createContext<DefaultOrderStatus>({
  orderStatus: 'pending', // Initial state value
  handleStatusChange: () => Promise.resolve(), // Placeholder function
})


export const OrderStatusProvider = ({ children }: { children: React.ReactNode }) => {

  const params = useParams<{ storeId: string; orderId: string }>()
  const {storeId, orderId} = params;

  const [orderStatus, setOrderStatus] = useState<String>("Pending");

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`/api/${storeId}}/orders/${orderId}/status`, {
          // ... configure fetch request (e.g., headers, method)
        });

        if (response.ok) {
          const data: any = await response.json();
          setOrderStatus(data.status); // Update state with fetched status
        } else {
          console.error('Error fetching order status:', response);
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, []);

  const handleStatusChange = async (newStatus: String) => {

    console.log("envoi requette update order", newStatus)
    try {
      const response = await fetch(`/api/${storeId}}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( newStatus ),
      });

      if (response.ok) {
        setOrderStatus(newStatus);
      } else {
        console.error('Error updating order status:', response);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <OrderStatusContext.Provider value={{ orderStatus, handleStatusChange }}>
      {children}
    </OrderStatusContext.Provider>
  );
};
