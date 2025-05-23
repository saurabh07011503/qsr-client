
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="bg-gradient-to-b from-blue-50 to-white">
          <div className="qsr-container py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Your Quick Service Restaurant
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Pre-order your meals, skip the line, and enjoy express pickup with our QSR system
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/register?tab=customer')}
                    className="btn-primary text-lg px-8 py-6"
                  >
                    Register Now
                  </Button>
                  <Button 
                    onClick={() => navigate('/menu')}
                    variant="outline"
                    className="text-lg px-8 py-6"
                  >
                    Browse Menu
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="Corporate cafeteria food"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="qsr-container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-qsr-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Login</h3>
              <p className="text-gray-600">
                Create your account or scan the QR code at your cafeteria to login
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-qsr-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Order & Pay</h3>
              <p className="text-gray-600">
                Browse the menu, add items to your cart, and complete your payment
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-qsr-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Express Pickup</h3>
              <p className="text-gray-600">
                Skip the line with your pickup token when your order is ready
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
