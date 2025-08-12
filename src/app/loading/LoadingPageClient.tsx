'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/LoadingAnimation';

export default function LoadingPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get('prompt');

  const handleComplete = () => {
    router.push(`/result?prompt=${encodeURIComponent(prompt || '')}`);
  };

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

  return <LoadingAnimation prompt={prompt} onComplete={handleComplete} />;
} 