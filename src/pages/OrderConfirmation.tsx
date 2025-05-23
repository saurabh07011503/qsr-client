
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderSummary from '../components/OrderSummary';
import { useAuth } from '../context/AuthContext';

interface MockOrderItem {
  name: string;
  quantity: number;
  price: number;
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [mockOrder, setMockOrder] = useState({
    items: [] as MockOrderItem[],
    total: 0,
    paymentMethod: '',
    pickupTime: '',
    pickupToken: '',
  });

  useEffect(() => {
    // In a real app, we would fetch the order details from an API
    // For demo purposes, we'll create some mock data
    const mockItems = [
      { name: 'Cappuccino', quantity: 1, price: 120 },
      { name: 'Croissant', quantity: 2, price: 85 },
    ];
    
    const total = mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const paymentMethods = ['Cafeteria Wallet', 'UPI Payment', 'Payroll Deduction'];
    const randomPayment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    // Generate pickup time 15-20 minutes from now
    const now = new Date();
    const minutes = 15 + Math.floor(Math.random() * 5);
    now.setMinutes(now.getMinutes() + minutes);
    const pickupTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Generate random pickup token
    const pickupToken = 'QR' + Math.floor(Math.random() * 9000 + 1000);
    
    setMockOrder({
      items: mockItems,
      total,
      paymentMethod: randomPayment,
      pickupTime,
      pickupToken,
    });
  }, [orderId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="qsr-container py-8 max-w-2xl">
          <OrderSummary 
            orderId={orderId || ''}
            items={mockOrder.items}
            total={mockOrder.total}
            paymentMethod={mockOrder.paymentMethod}
            pickupTime={mockOrder.pickupTime}
            pickupToken={mockOrder.pickupToken}
          />
          
          <div className="mt-8 flex justify-center">
            <Link to="/menu">
              <Button className="px-8 bg-qsr-blue hover:bg-qsr-darkblue">
                Return to Menu
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
