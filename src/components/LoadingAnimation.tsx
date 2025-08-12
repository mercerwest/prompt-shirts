'use client';

import { useState, useEffect } from 'react';

interface LoadingAnimationProps {
  prompt: string;
  onComplete: () => void;
}

const loadingSteps = [
  'Analyzing prompt...',
  'Generating initial concept...',
  'Applying artistic style...',
  'Enhancing details...',
  'Finalizing design...',
  'Rendering shirt mockup...',
  'Quality check complete!'
];

export default function LoadingAnimation({ prompt, onComplete }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 800; // 800ms per step
    const totalDuration = stepDuration * loadingSteps.length;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + (100 / (totalDuration / 50));
        }
        return prev;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center p-8">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Prompt Shirts</h1>
          <p className="text-gray-400">AI-Generated Fashion</p>
        </div>

        {/* Prompt Display */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-2">Your Prompt:</h2>
          <p className="text-gray-300 italic">"{prompt}"</p>
        </div>

        {/* Loading Animation */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Generating...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="mb-6">
            <p className="text-white text-lg font-medium">
              {loadingSteps[currentStep]}
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full animate-pulse ${
                  i === currentStep % 3 ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>

          {/* Fake AI Processing Indicators */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <p className="text-gray-400">Model: Stable Diffusion XL</p>
              <p className="text-gray-400">Steps: 50/50</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">CFG Scale: 7.5</p>
              <p className="text-gray-400">Seed: {Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Generating your custom t-shirt design...
          </p>
        </div>
      </div>
    </div>
  );
} 