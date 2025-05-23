import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import QrScanner from './QrScanner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PickupCounter = () => {
  const { user } = useContext(AuthContext);
  const [pickupToken, setPickupToken] = useState('');
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/login';
    }
  }, [user]);

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    verifyToken(pickupToken);
  };

  const handleQrScan = (result) => {
    if (result) {
      setPickupToken(result);
      verifyToken(result);
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`/api/orders/verify-token/${token}`);
      const { message, status, order } = response.data;
      setScanResult({ message, status, order });
      toast.success(message);
    } catch (error) {
      toast.error('Error verifying token');
    }
  };

  return (
    <div>
      <h1>Pickup Counter</h1>
      <form onSubmit={handleTokenSubmit}>
        <input
          type="text"
          value={pickupToken}
          onChange={(e) => setPickupToken(e.target.value)}
          placeholder="Enter or scan pickup token"
        />
        <button type="submit">Verify Token</button>
      </form>
      <QrScanner onScan={handleQrScan} />
      <ToastContainer />
      {scanResult && (
        <div>
          <h2>{scanResult.message}</h2>
          <p>Status: {scanResult.status}</p>
          <p>Order ID: {scanResult.order.id}</p>
          <p>Items: {scanResult.order.items.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PickupCounter;
