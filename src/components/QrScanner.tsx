
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QrScannerProps {
  onScan: (employeeId: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);

  const startScanning = () => {
    setScanning(true);
    // In a real app, we'd initialize a QR scanner library here
    // For demo purposes, we'll simulate finding a QR code after 2 seconds
    setTimeout(() => {
      setScanning(false);
      // Simulate scanning employee ID "EMP001"
      onScan("EMP001");
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">QR Code Scanner</h3>
      
      {scanning ? (
        <div className="relative bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
          <div className="animate-pulse-light">
            <div className="w-48 h-48 border-2 border-qsr-blue relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-qsr-blue"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-qsr-blue"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-qsr-blue"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-qsr-blue"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-qsr-blue/20 w-64 h-1"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
          <div className="text-gray-500">QR Scanner Preview</div>
        </div>
      )}
      
      <p className="text-gray-600 mb-4">
        Position the QR code inside the scanner to login
      </p>
      
      <Button 
        onClick={startScanning}
        disabled={scanning}
        className="bg-qsr-blue hover:bg-qsr-darkblue text-white w-full py-3"
      >
        {scanning ? 'Scanning...' : 'Start Scanner'}
      </Button>
    </div>
  );
};

export default QrScanner;
