
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, getMenuItemsByCategory } from '../data/menuData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuItem from '../components/MenuItem';
import Cart from '../components/Cart';
import axios from 'axios';

const Menu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items: cartItems, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('/menu/get-location');
        setLocations(res.data);
        if (res.data.length > 0) {
          setSelectedLocation(res.data[0]);
        }
      } catch (err) {
        toast.error('Failed to load locations');
      }
    };
    fetchLocations();
  }, []);

  // Fetch menu items when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation) return;
    const fetchMenu = async () => {
      setLoadingMenu(true);
      try {
        const res = await axios.get('/menu/get-menu', { params: { location: selectedLocation } });
        setMenuItems(res.data);
      } catch (err) {
        toast.error('Failed to load menu for selected location');
        setMenuItems([]);
      } finally {
        setLoadingMenu(false);
      }
    };
    fetchMenu();
  }, [selectedLocation]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      // In a real app, we would make an API call here
      const orderId = 'ORD' + Math.floor(Math.random() * 10000);
      
      clearCart();
      setIsCheckoutOpen(false);
      setIsProcessingOrder(false);
      
      navigate(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBookOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        navigate('/login');
        return;
      }
      const formattedItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        category: item.category,
        description: item.description
      }));
      const response = await axios.post('/orders/book-order', {
        items: formattedItems || [],
        totalAmount: calculateTotal(cartItems) || 0
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Order Response:', response.data);
      console.log('Order ID:', response.data.order.id);
      navigate(`/order-confirmation/${response.data.order.id}`);
    } catch (error) {
      console.error('Error booking order:', error);
      console.error('Error Response:', error.response ? error.response.data : 'No response data');
      
      if (error.response?.status === 401) {
        toast.error('Please login to place an order');
        navigate('/login');

      } else {
        toast.error('Failed to place order. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="qsr-container py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Menu</h1>
            {user && (
              <p className="text-gray-600">
                Welcome, {user.name}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="location-select" className="font-semibold mr-2">Select Location:</label>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loadingMenu ? (
                <div className="text-center py-8">Loading menu...</div>
              ) : (
                <Tabs defaultValue={menuItems.length > 0 ? menuItems[0].category : ''} className="w-full">
                  <TabsList className="mb-6 flex flex-wrap h-auto">
                    {[...new Set(menuItems.map(item => item.category))].map(category => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="flex-grow"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {[...new Set(menuItems.map(item => item.category))].map(category => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {menuItems.filter(item => item.category === category).map(item => (
                          <MenuItem key={item._id || item.id} item={item} />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
            <div>
              <Cart onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </main>
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet">Cafeteria Wallet</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi">UPI Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="payroll" id="payroll" />
                <Label htmlFor="payroll">Payroll Deduction</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsCheckoutOpen(false)}
              disabled={isProcessingOrder}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookOrder}
              disabled={isProcessingOrder}
              className="bg-qsr-blue hover:bg-qsr-darkblue"
            >
              {isProcessingOrder ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Menu;
