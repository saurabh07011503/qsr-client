
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { Check, X, AlertTriangle } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useAuth } from '../context/AuthContext';
// import { Order, MOCK_ORDERS } from '../data/ordersData';
// import QrScanner from '../components/QrScanner';
// import axios from 'axios';

// const PickupCounter = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [pickupToken, setPickupToken] = useState('');
//   const [scanResult, setScanResult] = useState<{
//     status: 'success' | 'error' | 'warning' | null;
//     message: string;
//     order?: Order;
//   } | null>(null);

//   // Redirect to login if not authenticated or not an admin
//   // React.useEffect(() => {
//   //   if (!user || user.role !== 'admin') {
//   //     navigate('/login');
//   //   }
//   // }, [user, navigate]);

//   const handleTokenSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     verifyToken(pickupToken);
//   };

//   const handleQrScan = (scannedToken: string) => {
//     verifyToken(scannedToken);
//   };

// const verifyToken = async (token: string) => {
//   // Clear previous result
//   if (!token.trim()) {
//     toast.error('Please enter a pickup token');
//     return;
//   }

//   try {
//     const response = await axios.get(`/api/orders/verify-token/${token}`);
//     const { message, status, order } = response.data;
//     setScanResult({ status, message, order });
//     if (status === 'success') {
//       toast.success(message);
//     } else if (status === 'warning') {
//       toast.warning(message);
//     } else {
//       toast.error(message);
//     }
//   } catch (error) {
//     toast.error('Error verifying token');
//   }
// };
    
//     if (!token.trim()) {
//       toast.error('Please enter a pickup token');
//       return;
//     }
    
//     // For demo, let's simulate finding an order
//     const foundOrder = MOCK_ORDERS.find(order => order.pickupToken === token);
    
//     if (!foundOrder) {
//       setScanResult({
//         status: 'error',
//         message: 'No order found with this token',
//       });
//       toast.error('No order found');
//       return;
//     }
    
//     if (foundOrder.status === 'delivered') {
//       setScanResult({
//         status: 'warning',
//         message: 'This order has already been picked up',
//         order: foundOrder,
//       });
//       toast.warning('Order already delivered');
//       return;
//     }
    
//     if (foundOrder.status !== 'ready') {
//       setScanResult({
//         status: 'warning',
//         message: `This order is not ready yet (Status: ${foundOrder.status})`,
//         order: foundOrder,
//       });
//       toast.warning('Order not ready yet');
//       return;
//     }
    
//     // Order is ready for pickup
//     setScanResult({
//       status: 'success',
//       message: 'Pickup Approved',
//       order: foundOrder,
//     });
//     toast.success('Order verification successful');
//   };

//   const getResultIcon = () => {
//     if (!scanResult) return null;
    
//     switch (scanResult.status) {
//       case 'success':
//         return <Check className="h-16 w-16 text-green-500" />;
//       case 'error':
//         return <X className="h-16 w-16 text-red-500" />;
//       case 'warning':
//         return <AlertTriangle className="h-16 w-16 text-amber-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
      
//       <main className="flex-grow bg-gray-50">
//         <div className="qsr-container py-8 md:py-12 max-w-4xl">
//           <h1 className="text-3xl font-bold text-center mb-8">Pickup Counter</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Verify Pickup Token</h2>
                
//                 <form onSubmit={handleTokenSubmit} className="space-y-4">
//                   <div>
//                     <Input
//                       placeholder="Enter pickup token (e.g. QR1234)"
//                       value={pickupToken}
//                       onChange={(e) => setPickupToken(e.target.value)}
//                     />
//                   </div>
                  
//                   <Button 
//                     type="submit" 
//                     className="w-full bg-qsr-blue hover:bg-qsr-darkblue"
//                   >
//                     Verify Token
//                   </Button>
//                 </form>
//               </div>
              
//               <QrScanner onScan={handleQrScan} />
//             </div>
            
//             <div>
//               {scanResult && (
//                 <div className={`
//                   bg-white rounded-lg shadow-md p-8 text-center
//                   ${scanResult.status === 'success' ? 'border-green-200 border-2' : ''}
//                   ${scanResult.status === 'warning' ? 'border-amber-200 border-2' : ''}
//                   ${scanResult.status === 'error' ? 'border-red-200 border-2' : ''}
//                 `}>
//                   <div className="flex justify-center mb-4">
//                     {getResultIcon()}
//                   </div>
                  
//                   <h2 className={`
//                     text-2xl font-bold mb-2
//                     ${scanResult.status === 'success' ? 'text-green-600' : ''}
//                     ${scanResult.status === 'warning' ? 'text-amber-600' : ''}
//                     ${scanResult.status === 'error' ? 'text-red-600' : ''}
//                   `}>
//                     {scanResult.message}
//                   </h2>
                  
//                   {scanResult.order && (
//                     <div className="mt-6 text-left">
//                       <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-b py-4 mb-4">
//                         <div className="text-gray-600">Order ID:</div>
//                         <div className="font-medium">{scanResult.order.id}</div>
                        
//                         <div className="text-gray-600">Customer:</div>
//                         <div className="font-medium">{scanResult.order.employeeName}</div>
                        
//                         <div className="text-gray-600">Pickup Token:</div>
//                         <div className="font-medium">{scanResult.order.pickupToken}</div>
                        
//                         <div className="text-gray-600">Status:</div>
//                         <div className="font-medium capitalize">{scanResult.order.status}</div>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <h3 className="font-medium">Items:</h3>
//                         {scanResult.order.items.map((item, index) => (
//                           <div key={index} className="flex justify-between">
//                             <span>{item.name} × {item.quantity}</span>
//                             <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         ))}
//                       </div>
                      
//                       <div className="border-t mt-4 pt-4">
//                         <div className="flex justify-between font-bold">
//                           <span>Total:</span>
//                           <span>₹{scanResult.order.total.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default PickupCounter;
