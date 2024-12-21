import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SuccessMessage: React.FC = () => (
  <div className="padding-16 background-color-green-100 border-radius-4 display-flex align-items-center">
    <CheckCircle className="color-green-500 margin-right-12" size={24} />
    <p className="color-green-800">Thank you for your message. We will be in touch shortly.</p>
  </div>
);