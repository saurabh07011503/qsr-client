
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { useAuth } from '../context/AuthContext';

const Register = () => {
  // Customer registration state
  const [customerData, setCustomerData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Admin registration state
  const [adminData, setAdminData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!customerData.name.trim() || !customerData.email.trim() || 
        !customerData.employeeId.trim() || !customerData.password.trim() || 
        !customerData.confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(customerData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (customerData.password !== customerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (customerData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register({
        employeeId: customerData.employeeId,
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
        role: 'customer'
      });
      
      if (success) {
        toast.success('Registration successful! Please login.');
        navigate('/login?tab=customer');
      } else {
        toast.error('Employee ID or email already exists.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!adminData.name.trim() || !adminData.email.trim() || 
        !adminData.employeeId.trim() || !adminData.password.trim() || 
        !adminData.confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(adminData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (adminData.password !== adminData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (adminData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register({
        employeeId: adminData.employeeId,
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        role: 'admin'
      });
      
      if (success) {
        toast.success('Registration successful! Please login.');
        navigate('/login?tab=admin');
      } else {
        toast.error('Employee ID or email already exists.');
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
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="customer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <form onSubmit={handleCustomerRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Enter your full name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        name: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        email: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmployeeId">Employee ID</Label>
                    <Input
                      id="customerEmployeeId"
                      type="text"
                      placeholder="Enter your Employee ID"
                      value={customerData.employeeId}
                      onChange={(e) => setCustomerData({
                        ...customerData,
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
                      placeholder="Create a password"
                      value={customerData.password}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        password: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerConfirmPassword">Confirm Password</Label>
                    <Input
                      id="customerConfirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={customerData.confirmPassword}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        confirmPassword: e.target.value
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
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <Link
                      to="/login?tab=customer"
                      className="text-blue-600 hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Full Name</Label>
                    <Input
                      id="adminName"
                      type="text"
                      placeholder="Enter your full name"
                      value={adminData.name}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        name: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={adminData.email}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        email: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmployeeId">Admin ID</Label>
                    <Input
                      id="adminEmployeeId"
                      type="text"
                      placeholder="Enter your Admin ID"
                      value={adminData.employeeId}
                      onChange={(e) => setAdminData({
                        ...adminData,
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
                      placeholder="Create a password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        password: e.target.value
                      })}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminConfirmPassword">Confirm Password</Label>
                    <Input
                      id="adminConfirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        confirmPassword: e.target.value
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
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                  
                  <p className="text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <Link
                      to="/login?tab=admin"
                      className="text-blue-600 hover:underline"
                    >
                      Login here
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

export default Register;
