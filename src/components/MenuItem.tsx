
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, MenuItem as MenuItemType } from '../context/CartContext';
import { toast } from 'sonner';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    toast.success(`Added ${quantity} ${item.name} to cart`);
    setQuantity(1);
  };

  return (
    <div className="menu-card">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2 h-12 overflow-hidden">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-qsr-darkgray">₹{item.price.toFixed(2)}</span>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-r-none" 
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-l-none" 
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="bg-qsr-blue hover:bg-qsr-darkblue text-white" 
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
