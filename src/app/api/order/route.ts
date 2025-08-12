import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe only if environment variable is available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      prompt, 
      customerInfo, 
      shirtColor, 
      shirtSize 
    } = body;

    // Validate required fields
    if (!prompt || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Profanity check (basic implementation)
    const bannedWords = [
      'fuck', 'shit', 'bitch', 'ass', 'dick', 'pussy', 'cock', 'cunt',
      'nazi', 'hitler', 'terrorist', 'bomb', 'kill', 'murder', 'suicide'
    ];
    
    const lowerPrompt = prompt.toLowerCase();
    const containsBannedWords = bannedWords.some(word => lowerPrompt.includes(word));
    
    if (containsBannedWords) {
      return NextResponse.json(
        { error: 'Prompt contains inappropriate content' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom Prompt Shirt',
              description: `T-shirt with prompt: "${prompt}"`,
              images: [], // Would include mockup image in production
            },
            unit_amount: 2999, // $29.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/result?prompt=${encodeURIComponent(prompt)}`,
      metadata: {
        prompt,
        shirtColor,
        shirtSize,
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      },
    });

    // Log order for future reference
    const orderData = {
      id: session.id,
      prompt,
      customerInfo,
      shirtColor,
      shirtSize,
      amount: 2999,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // In production, you'd save this to a database
    console.log('Order created:', orderData);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// Webhook handler for Stripe events
export async function PUT(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Handle successful payment
      console.log('Payment successful for session:', session.id);
      
      // Here you would:
      // 1. Create the product in Printful
      // 2. Create the order in Printful
      // 3. Update order status in your database
      // 4. Send confirmation email to customer
      
      // For now, just log the success
      console.log('Order completed:', {
        sessionId: session.id,
        customerEmail: session.metadata?.customerEmail,
        prompt: session.metadata?.prompt,
      });
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 