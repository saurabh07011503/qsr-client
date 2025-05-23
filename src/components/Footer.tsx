
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("bg-gray-100 py-6", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Corporate Cafe. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="#" className="text-sm text-qsr-blue hover:text-qsr-darkblue">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-qsr-blue hover:text-qsr-darkblue">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-qsr-blue hover:text-qsr-darkblue">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
