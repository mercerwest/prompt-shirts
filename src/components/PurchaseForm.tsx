'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const purchaseSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface PurchaseFormProps {
  prompt: string;
  onBack: () => void;
}

export default function PurchaseForm({ prompt, onBack }: PurchaseFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema)
  });

  const onFormSubmit = async (data: PurchaseFormData) => {
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would create a Stripe checkout session
      // For now, we'll simulate the process
      console.log('Creating order with data:', data);
      console.log('Prompt:', prompt);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('checkout');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 'checkout') {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Redirecting to Checkout</h3>
          <p className="text-gray-300">You'll be redirected to Stripe to complete your payment.</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">Order Summary:</h4>
          <p className="text-sm text-gray-300 mb-2">Custom T-Shirt with prompt: "{prompt}"</p>
          <p className="text-sm text-gray-300">Price: $29.99</p>
          <p className="text-sm text-gray-300">Shipping: Free</p>
          <p className="font-semibold text-white">Total: $29.99</p>
        </div>

        <div className="animate-pulse">
          <div className="w-full bg-gray-600 rounded-lg h-4 mb-2"></div>
          <div className="w-3/4 bg-gray-600 rounded-lg h-4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="text-blue-400 hover:text-blue-300 mb-6 flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shirt
      </button>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-1">
                First Name *
              </label>
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-1">
                Last Name *
              </label>
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold text-white mb-3">Shipping Address</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-1">
                Street Address *
              </label>
              <input
                {...register('address')}
                type="text"
                id="address"
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                  errors.address ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-200 mb-1">
                  City *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  id="city"
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                    errors.city ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-200 mb-1">
                  State *
                </label>
                <input
                  {...register('state')}
                  type="text"
                  id="state"
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                    errors.state ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-400">{errors.state.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-200 mb-1">
                  ZIP Code *
                </label>
                <input
                  {...register('zipCode')}
                  type="text"
                  id="zipCode"
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-400">{errors.zipCode.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-200 mb-1">
                Country *
              </label>
              <select
                {...register('country')}
                id="country"
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                  errors.country ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
            isProcessing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Proceed to Checkout - $29.99'
          )}
        </button>
      </form>
    </div>
  );
} 