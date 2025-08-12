'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const promptSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters long')
    .max(500, 'Prompt must be less than 500 characters')
    .refine((value) => {
      const bannedWords = [
        'fuck', 'shit', 'bitch', 'ass', 'dick', 'pussy', 'cock', 'cunt',
        'nazi', 'hitler', 'terrorist', 'bomb', 'kill', 'murder', 'suicide'
      ];
      const lowerValue = value.toLowerCase();
      return !bannedWords.some(word => lowerValue.includes(word));
    }, 'Prompt contains inappropriate content')
});

type PromptFormData = z.infer<typeof promptSchema>;

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema)
  });

  const onFormSubmit = async (data: PromptFormData) => {
    setIsSubmitting(true);
    onSubmit(data.prompt);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        Enter Your AI Prompt
      </h2>
      <p className="text-gray-300 mb-8">
        Describe the shirt design you want. Be creative, be specific, be ridiculous.
      </p>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-200 mb-2">
            Your Prompt
          </label>
          <textarea
            {...register('prompt')}
            id="prompt"
            rows={4}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
              errors.prompt ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="e.g., A majestic cat wearing a business suit, oil painting style, dramatic lighting, masterpiece, trending on artstation"
            disabled={isLoading || isSubmitting}
          />
          {errors.prompt && (
            <p className="mt-2 text-sm text-red-400">{errors.prompt.message}</p>
          )}
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <h3 className="font-medium text-blue-200 mb-2">Prompt Tips:</h3>
          <ul className="text-sm text-blue-100 space-y-1">
            <li>• Be specific about style, mood, and composition</li>
            <li>• Include artistic styles like "oil painting" or "digital art"</li>
            <li>• Add quality modifiers like "masterpiece" or "trending"</li>
            <li>• Keep it creative and fun!</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
            isLoading || isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isLoading || isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Your Design...</span>
            </div>
          ) : (
            'Generate My Shirt Design'
          )}
        </button>
      </form>
    </div>
  );
} 