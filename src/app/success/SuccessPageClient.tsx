'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch order details from your backend
      // For now, we'll simulate this
      setTimeout(() => {
        setOrderDetails({
          id: sessionId,
          status: 'confirmed',
          estimatedDelivery: '7-10 business days',
          trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Processing your order...</h2>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Order</h1>
          <p className="text-gray-400 mb-6">No order session found.</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300">
              Thank you for your purchase. Your custom t-shirt is being prepared.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-mono">{orderDetails?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold">{orderDetails?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Delivery:</span>
                <span className="text-white">{orderDetails?.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tracking Number:</span>
                <span className="text-white font-mono">{orderDetails?.trackingNumber}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-200 mb-4">What&apos;s Next?</h3>
            <ul className="text-left text-blue-100 space-y-2">
              <li>• You&apos;ll receive a confirmation email shortly</li>
              <li>• Your t-shirt will be printed and shipped within 2-3 business days</li>
              <li>• We&apos;ll send you tracking information when it ships</li>
              <li>• Expected delivery: {orderDetails?.estimatedDelivery}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Another Design
            </a>
            <div>
              <a 
                href="/" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 