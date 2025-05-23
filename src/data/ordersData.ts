
import axios from 'axios';

export interface Order {
  id: string;
  employeeId: string;
  employeeName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  paymentMethod: string;
  orderTime: string;
  pickupToken: string;
}

// Mock orders data
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD7539',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    items: [
      { name: 'Cappuccino', quantity: 1, price: 120 },
      { name: 'Croissant', quantity: 1, price: 85 }
    ],
    total: 205,
    status: 'ready',
    paymentMethod: 'Cafeteria Wallet',
    orderTime: '09:45 AM',
    pickupToken: 'QR1234'
  },
  {
    id: 'ORD6284',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    items: [
      { name: 'Cold Brew', quantity: 1, price: 150 },
      { name: 'Buddha Bowl', quantity: 1, price: 280 }
    ],
    total: 430,
    status: 'preparing',
    paymentMethod: 'UPI Payment',
    orderTime: '10:15 AM',
    pickupToken: 'QR5678'
  },
  {
    id: 'ORD4259',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    items: [
      { name: 'Lunch Combo', quantity: 1, price: 350 }
    ],
    total: 350,
    status: 'pending',
    paymentMethod: 'Payroll Deduction',
    orderTime: '11:30 AM',
    pickupToken: 'QR9012'
  },
  {
    id: 'ORD3581',
    employeeId: 'EMP004',
    employeeName: 'Sarah Wilson',
    items: [
      { name: 'Green Tea', quantity: 1, price: 90 },
      { name: 'Fruit Bowl', quantity: 1, price: 120 }
    ],
    total: 210,
    status: 'delivered',
    paymentMethod: 'Cafeteria Wallet',
    orderTime: '09:15 AM',
    pickupToken: 'QR3456'
  },
  {
    id: 'ORD2951',
    employeeId: 'EMP005',
    employeeName: 'David Brown',
    items: [
      { name: 'Pasta Primavera', quantity: 1, price: 240 },
      { name: 'Chocolate Brownie', quantity: 1, price: 90 }
    ],
    total: 330,
    status: 'ready',
    paymentMethod: 'UPI Payment',
    orderTime: '12:10 PM',
    pickupToken: 'QR7890'
  }
];

export const getOrderById = (id: string): Order | undefined => {
  return MOCK_ORDERS.find(order => order.id === id);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return MOCK_ORDERS.filter(order => order.status === status);
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get('https://qsr-server-m9aa.onrender.com/api/orders/admin-getOrders', {
      headers: {
        Authorization: token
      }
    });

    return response.data.map((order: any) => ({
      id: order._id,
      employeeId: order.customer?.employeeId || '',
      employeeName: order.customer?.name || '',
      items: order.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: order.totalAmount,
      status: order.status,
      paymentMethod: order.paymentMethod || 'Not specified',
      orderTime: new Date(order.createdAt).toISOString(),
      pickupToken: order.pickupToken || ''
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.patch(`https://qsr-server-m9aa.onrender.com/api/orders/${orderId}/status`, {
      status: newStatus
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
