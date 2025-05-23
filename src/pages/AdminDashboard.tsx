
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS, Order, getAllOrders, handleStatusChange } from '../data/ordersData';
import { toast } from 'sonner';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newMenuItems, setNewMenuItems] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Fetch orders only once when component mounts
  }, []);

  // Redirect to login if not authenticated or not an admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      navigate('/menu');
      toast.error('You do not have permission to access this page');
    }
  }, [user, navigate, isAdmin]);

  const handleStatusChangeInDashboard = async (orderId: string, newStatus: Order['status']) => {
    try {
      const updatedOrder = await handleStatusChange(orderId, newStatus);
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order ${orderId} marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.employeeName.toLowerCase().includes(query) ||
        order.employeeId.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMenuItemToList = (item) => {
    setNewMenuItems([...newMenuItems, item]);
  };

  const handleSaveMenu = async () => {
    try {
      const response = await axios.post('/menu/create-multiple-menu', { menuItems: newMenuItems });
      console.log('Menu items created:', response.data);
      // Reset menu items after successful save
      setNewMenuItems([]);
    } catch (error) {
      console.error('Error creating menu items:', error);
    }
  };

  const [menuItemName, setMenuItemName] = useState('');
  const [menuItemPrice, setMenuItemPrice] = useState('');
  const [menuItemDescription, setMenuItemDescription] = useState('');
  const [menuItemImage, setMenuItemImage] = useState('');
  const [menuItemCategory, setMenuItemCategory] = useState('');
  const [menuItemLocation, setMenuItemLocation] = useState('');

  const handleAddMenuItem = () => {
    const newItem = {
      name: menuItemName,
      description: menuItemDescription,
      price: parseFloat(menuItemPrice),
      image: menuItemImage,
      category: menuItemCategory,
      location: menuItemLocation
    };
    setNewMenuItems([...newMenuItems, newItem]);
    setMenuItemName('');
    setMenuItemDescription('');
    setMenuItemPrice('');
    setMenuItemImage('');
    setMenuItemCategory('');
    setMenuItemLocation('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="qsr-container py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <Tabs>
            <TabList>
              <Tab>Orders Management</Tab>
              {/* <Tab>Report</Tab> */}
              <Tab>Add Menu</Tab>
            </TabList>

            <TabPanel>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Orders Management</h2>
                  {/* <Button variant="outline">Export Report</Button> */}
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by order ID, employee name..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select 
                    value={filterStatus} 
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Employee</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            Loading orders...
                          </TableCell>
                        </TableRow>
                      ) : filteredOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No orders found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredOrders.map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>{order.employeeName}</div>
                              <div className="text-xs text-gray-500">{order.employeeId}</div>
                            </TableCell>
                            <TableCell>{order.orderTime}</TableCell>
                            <TableCell>
                              <div className="max-w-[200px]">
                                {order.items.map((item, index) => (
                                  <div key={index} className="text-sm truncate">
                                    {item.quantity}x {item.name}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>₹{order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className={`font-medium ${getStatusBadgeColor(order.status)}`}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={order.status}
                                onValueChange={(value) => 
                                  handleStatusChangeInDashboard(
                                    order.id, 
                                    value as Order['status']
                                  )
                                }
                              >
                                <SelectTrigger className="w-full h-9">
                                  <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="preparing">Preparing</SelectItem>
                                  <SelectItem value="ready">Ready</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabPanel>
            {/* <TabPanel>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold">Report</h2> */}
                {/* Report content goes here */}
              {/* </div>
            </TabPanel> */}
            <TabPanel>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold">Add Menu</h2>
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Menu Item Name"
                    value={menuItemName}
                    onChange={(e) => setMenuItemName(e.target.value)}
                  />
                  <Input
                    placeholder="Menu Item Description"
                    value={menuItemDescription}
                    onChange={(e) => setMenuItemDescription(e.target.value)}
                  />
                  <Input
                    placeholder="Menu Item Price"
                    type="number"
                    value={menuItemPrice}
                    onChange={(e) => setMenuItemPrice(e.target.value)}
                  />
                  <Input
                    placeholder="Menu Item Image URL"
                    value={menuItemImage}
                    onChange={(e) => setMenuItemImage(e.target.value)}
                  />
                  <Input
                    placeholder="Menu Item Category"
                    value={menuItemCategory}
                    onChange={(e) => setMenuItemCategory(e.target.value)}
                  />
                  <Input
                    placeholder="Menu Item Location"
                    value={menuItemLocation}
                    onChange={(e) => setMenuItemLocation(e.target.value)}
                  />
                  <Button onClick={handleAddMenuItem}>Add Item</Button>
                  <Button onClick={handleSaveMenu}>Save Menu</Button>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
