
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QrScanner from '../components/QrScanner';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // Form state
  const [customerCredentials, setCustomerCredentials] = useState({
    employeeId: '',
    password: ''
  });
  const [adminCredentials, setAdminCredentials] = useState({
    employeeId: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('customer');

  // Parse the tab from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'customer' || tab === 'admin') {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerCredentials.employeeId.trim() || !customerCredentials.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(customerCredentials);
      
      if (success) {
        toast.success('Login successful!');
        navigate('/menu');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminCredentials.employeeId.trim() || !adminCredentials.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(adminCredentials);
      
      if (success) {
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQrScanCustomer = async (scannedId: string) => {
    setLoading(true);
    
    try {
      const success = await login({ employeeId: scannedId, password: '' });
      
      if (success) {
        toast.success('QR scan successful!');
        navigate('/menu');
      } else {
        toast.error('Invalid QR code. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <form onSubmit={handleCustomerLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerEmployeeId">Employee ID</Label>
                    <Input
                      id="customerEmployeeId"
                      type="text"
                      placeholder="Enter your Employee ID"
                      value={customerCredentials.employeeId}
                      onChange={(e) => setCustomerCredentials({
                        ...customerCredentials,
                        employeeId: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customerPassword">Password</Label>
                    <Input
                      id="customerPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={customerCredentials.password}
                      onChange={(e) => setCustomerCredentials({
                        ...customerCredentials,
                        password: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">Or scan your QR code</p>
                    <QrScanner onScan={handleQrScanCustomer} />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <Link
                      to="/register?tab=customer"
                      className="text-blue-600 hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmployeeId">Admin ID</Label>
                    <Input
                      id="adminEmployeeId"
                      type="text"
                      placeholder="Enter your Admin ID"
                      value={adminCredentials.employeeId}
                      onChange={(e) => setAdminCredentials({
                        ...adminCredentials,
                        employeeId: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials({
                        ...adminCredentials,
                        password: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <Link
                      to="/register?tab=admin"
                      className="text-blue-600 hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
