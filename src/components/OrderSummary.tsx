
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  className?: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  pickupTime: string;
  pickupToken: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  className,
  orderId,
  items,
  total,
  paymentMethod,
  pickupTime,
  pickupToken
}) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <Check className="h-6 w-6 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-center mb-2">Order Confirmed</h2>
      <p className="text-gray-600 text-center mb-6">Your order has been placed successfully!</p>
      
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <span className="text-sm text-gray-600">Order Reference</span>
          <span className="font-semibold">{orderId}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <span className="text-sm text-gray-600">Pickup Token</span>
          <span className="font-semibold text-qsr-blue">{pickupToken}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Estimated Pickup</span>
          <span className="font-semibold">{pickupTime}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Order Items</h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="text-gray-600">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Payment Method</span>
          <span>{paymentMethod}</span>
        </div>
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
