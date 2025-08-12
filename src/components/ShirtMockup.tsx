'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ShirtMockupProps {
  prompt: string;
}

export default function ShirtMockup({ prompt }: ShirtMockupProps) {
  const [selectedColor, setSelectedColor] = useState<'black' | 'white'>('white');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [mockupImage, setMockupImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    { 
      name: 'white', 
      bg: 'bg-white', 
      border: 'border-gray-300',
      mockupBg: 'bg-black', // Changed to true black background
      textColor: '#1f2937', // Dark gray for white shirts
      // Updated to use PNG files
      shirtImage: '/images/white-tshirt-realistic.png',
      fallbackImage: '/images/white-tshirt-realistic.png'
    },
    { 
      name: 'black', 
      bg: 'bg-gray-900', 
      border: 'border-gray-700',
      mockupBg: 'bg-white',
      textColor: '#ffffff', // White for black shirts
      // Updated to use PNG files
      shirtImage: '/images/black-tshirt-realistic.png',
      fallbackImage: '/images/black-tshirt-realistic.png'
    }
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Function to wrap text with maximum line limit and better word handling
  const wrapText = (text: string, maxWidth: number = 20, maxLines: number = 4) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      
      // Check if adding this word would exceed the line limit
      if ((currentLine + ' ' + word).length <= maxWidth) {
        currentLine += ' ' + word;
      } else {
        // If the word itself is longer than maxWidth, we need to truncate it
        if (word.length > maxWidth) {
          // Add current line if it has content
          if (currentLine.trim()) {
            lines.push(currentLine);
          }
          // Truncate the long word with a dash
          const truncatedWord = word.substring(0, maxWidth - 1) + '-';
          lines.push(truncatedWord);
          currentLine = '';
        } else {
          // Normal case: word fits on next line
          lines.push(currentLine);
          currentLine = word;
        }
      }
      
      // Stop if we've reached the maximum number of lines
      if (lines.length >= maxLines) {
        break;
      }
    }
    
    // Add the last line if we haven't reached the limit
    if (lines.length < maxLines && currentLine.trim()) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  const textLines = wrapText(prompt, 20, 4); // Reduced maxWidth for better margins
  const currentColor = colors.find(c => c.name === selectedColor);

  // Function to generate AI mockup (optional)
  const generateAIMockup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-mockup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          color: selectedColor,
          prompt: prompt
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMockupImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Error generating AI mockup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use the current color's image
  useEffect(() => {
    setMockupImage(currentColor?.shirtImage || '');
  }, [selectedColor, currentColor]);

  return (
    <div className="space-y-6">
      {/* Shirt Display */}
      <div className="flex justify-center">
        <div className="relative w-80 h-96 rounded-lg shadow-lg border-2 border-gray-700"> {/* Removed background color, let image fill the frame */}
          {/* T-Shirt Image */}
          <div className="relative w-full h-full">
            {mockupImage ? (
              <Image
                src={mockupImage}
                alt={`${selectedColor} t-shirt mockup`}
                fill
                className="object-contain rounded-lg"
                priority
                onError={() => setMockupImage(currentColor?.fallbackImage || '')}
                style={{
                  // Ensure consistent sizing and positioning for both shirts
                  objectPosition: 'center',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm">T-shirt image not found</p>
                  <p className="text-xs mt-1">Add your images to /public/images/</p>
                </div>
              </div>
            )}
            
            {/* Text Overlay on Shirt - Positioned Higher with Better Truncation */}
            {mockupImage && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(-10%)' }}> {/* Changed back to center but with slight upward offset */}
                <div className="text-center px-16 py-6 max-h-40 overflow-hidden"> {/* Increased margins for printability */}
                  {textLines.map((line, index) => (
                    <div
                      key={index}
                      className="font-light leading-tight mb-1 relative"
                      style={{
                        color: currentColor?.textColor,
                        fontSize: textLines.length > 2 ? '10px' : '12px',
                        fontWeight: '300',
                        // Clean, simple text without any effects
                        textShadow: 'none',
                        WebkitTextStroke: 'none',
                        filter: 'none',
                        // Ensure text is crisp
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-semibold text-white mb-3">Color:</h3>
        <div className="flex space-x-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name as 'black' | 'white')}
              className={`relative w-16 h-16 rounded-lg border-2 transition-all ${
                selectedColor === color.name
                  ? 'border-blue-500 ring-2 ring-blue-400'
                  : 'border-gray-600 hover:border-gray-500'
              } ${color.bg}`}
            >
              {selectedColor === color.name && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <span className="sr-only">{color.name} shirt</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {selectedColor === 'white' ? 'White shirt on dark background' : 'Black shirt on light background'}
        </p>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-semibold text-white mb-3">Size:</h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size as 'S' | 'M' | 'L' | 'XL' | 'XXL')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedSize === size
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total Price:</span>
          <span className="text-2xl font-bold text-blue-400">$29.99</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">Free shipping worldwide</p>
      </div>
    </div>
  );
} 