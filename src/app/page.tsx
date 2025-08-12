'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PromptForm from '@/components/PromptForm';
import Header from '@/components/Header';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    
    // Redirect to loading page
    router.push(`/loading?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              Prompt Shirts
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Your imagination, rendered faithfully
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Enter any AI-style prompt and watch as we generate your custom t-shirt design. If you like it you can buy it.
            </p>
          </div>

          {/* Prompt Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
            <PromptForm onSubmit={handlePromptSubmit} isLoading={isLoading} />
          </div>

          {/* Recent Shirts Preview */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Recent Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentShirts.map((shirt, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                  <div className="bg-gray-700 rounded-lg h-48 mb-4 flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <img
                        src="/images/white-tshirt-realistic.png"
                        alt="White t-shirt mockup"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{shirt.prompt}</p>
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
