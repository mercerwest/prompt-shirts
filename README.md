# Prompt Shirts MVP

An eCommerce MVP that generates custom t-shirt designs from AI-style prompts. Users enter prompts, see an AI loading animation, and can purchase shirts with their prompt text printed on them.

## Features

- **Prompt Input Form**: Users enter AI-style prompts with validation and profanity filtering
- **AI Loading Animation**: Mimics Midjourney-style generation interfaces
- **Shirt Mockup Preview**: Shows the prompt text on a t-shirt design
- **Purchase Flow**: Stripe checkout integration for payments
- **Printful Integration**: Backend API for creating products and orders
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Payments**: Stripe Checkout
- **Print-on-Demand**: Printful API
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account
- Printful account (optional for MVP)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prompt-shirts
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Printful Configuration (optional for MVP)
PRINTFUL_API_KEY=your_printful_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── order/
│   │       └── route.ts          # Order processing API
│   ├── loading/
│   │   └── page.tsx              # Fake AI loading page
│   ├── result/
│   │   └── page.tsx              # Shirt preview & purchase
│   ├── success/
│   │   └── page.tsx              # Order confirmation
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage with prompt input
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── LoadingAnimation.tsx      # Fake AI generation animation
│   ├── PromptForm.tsx            # Prompt input form
│   ├── PurchaseForm.tsx          # Checkout form
│   └── ShirtMockup.tsx           # Shirt preview component
```

## Key Features Explained

### 1. Prompt Input & Validation
- Form validation using React Hook Form and Zod
- Profanity filtering with banned word list
- Character limits and required field validation

### 2. AI Loading Animation
- Simulates Midjourney-style generation process
- Progress bar and step-by-step status updates
- Realistic timing and visual effects

### 3. Shirt Mockup
- Interactive color and size selection
- Real-time preview of prompt text on shirt
- Responsive design for all devices

### 4. Purchase Flow
- Stripe Checkout integration
- Customer information collection
- Order processing and confirmation

### 5. API Integration
- Stripe webhook handling for payment confirmation
- Printful API integration (placeholder)
- Order logging and management

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_APP_URL`: Your production URL
- `PRINTFUL_API_KEY`: Your Printful API key (optional)

## Security Considerations

- All API keys are stored in environment variables
- Profanity filtering on both frontend and backend
- Input validation and sanitization
- HTTPS required for production
- Stripe webhook signature verification

## Legal & UX Safeguards

- Content moderation capabilities
- "We reserve the right to refuse any order" clause
- Transparent pricing and shipping information

## Future Enhancements

- Gallery of recent prompts (moderated)
- "Shirt of the Day" feature
- User accounts and order history
- Affiliate program for prompt creators
- Social sharing and community features
- Advanced design customization options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational and satirical purposes. Please ensure compliance with all applicable laws and regulations when deploying.

## Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Note**: This project demonstrates AI-powered t-shirt design generation with real eCommerce functionality.
