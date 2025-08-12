'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ShirtMockup from '@/components/ShirtMockup';
import PurchaseForm from '@/components/PurchaseForm';

export default function ResultPageClient() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt') || '';
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Prompt Found</h1>
          <p className="text-gray-400 mb-6">Please go back and enter a prompt first.</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Design is Ready!
            </h1>
            <p className="text-xl text-gray-300">
              Behold the power of AI-generated fashion
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Shirt Mockup */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Your Custom Shirt</h2>
              <ShirtMockup prompt={prompt} />
              
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Your Prompt:</h3>
                <p className="text-gray-300 italic">&quot;{prompt}&quot;</p>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Purchase Your Shirt</h2>
              
              {!showPurchaseForm ? (
                <div className="space-y-6">
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-200 mb-2">What You&apos;ll Get:</h3>
                    <ul className="text-sm text-blue-100 space-y-1">
                      <li>• High-quality cotton t-shirt</li>
                      <li>• Your prompt text printed on the front</li>
                      <li>• Available in black or white</li>
                      <li>• Unisex sizing (S, M, L, XL, XXL)</li>
                      <li>• Free shipping worldwide</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowPurchaseForm(true)}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Buy Your Shirt - $29.99
                  </button>

                  <div className="text-center">
                    <a 
                      href="/" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      ← Create Another Design
                    </a>
                  </div>
                </div>
              ) : (
                <PurchaseForm prompt={prompt} onBack={() => setShowPurchaseForm(false)} />
              )}
            </div>
          </div>

          {/* Recent Shirts Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Recent Community Creations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentShirts.map((shirt, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                  <div className="bg-gray-700 rounded-lg h-48 mb-4 flex items-center justify-center p-2">
                    {/* Clean white shirt mockup for recent creations */}
                    <div className="relative w-full h-full">
                      <img
                        src="/images/white-tshirt-realistic.png"
                        alt="White t-shirt mockup"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 truncate mb-2">{shirt.prompt}</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded text-sm hover:bg-green-700 transition-colors">
                    Buy Their Shirt
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const recentShirts = [
  { prompt: "Grateful dead tshirt W/ a skull on it and tie dye" },
  { prompt: "A dog walking on the moon, wearing shoes, hyperrealistic" },
  { prompt: "A million dollars cash" },
]; 