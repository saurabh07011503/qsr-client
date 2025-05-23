
import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartProps {
  className?: string;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ className, onCheckout }) => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-r-none"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="px-3 py-1 border-y">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-l-none"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between font-semibold">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        <Button 
          className="w-full bg-qsr-blue hover:bg-qsr-darkblue text-white py-3"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
