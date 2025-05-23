
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className={cn("bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-50", className)}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl text-qsr-blue">Corporate Cafeteria</div>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline-block text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              
              {isAdmin() ? (
                <Link to="/admin" className="text-sm text-qsr-blue font-medium hover:text-qsr-darkblue flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link to="/menu" className="text-sm text-qsr-blue font-medium hover:text-qsr-darkblue">
                  Menu
                </Link>
              )}
              
              <Link to="/menu" className="relative">
                <ShoppingCart className="h-6 w-6 text-qsr-darkgray" />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-qsr-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </div>
                )}
              </Link>
              
              <Button 
                variant="ghost" 
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                className="flex items-center gap-1 text-sm text-qsr-blue font-medium hover:text-qsr-darkblue"
                onClick={() => navigate('/login?tab=customer')}
              >
                <User className="h-4 w-4" />
                Customer Login
              </Button>
              
              <Button
                variant="ghost" 
                className="flex items-center gap-1 text-sm text-qsr-blue font-medium hover:text-qsr-darkblue"
                onClick={() => navigate('/login?tab=admin')}
              >
                <LogIn className="h-4 w-4" />
                Admin Login
              </Button>
              
              <Link to="/menu">
                <Button variant="default" className="bg-qsr-blue hover:bg-qsr-darkblue">
                  Browse Menu
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
