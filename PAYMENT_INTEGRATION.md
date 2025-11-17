# Payment Integration Guide

## Overview
This guide explains how to integrate Stripe payments for Featured Product ($15) and Premium Unlimited ($49).

## Stripe Setup

### 1. Create Stripe Account
1. Go to [https://stripe.com](https://stripe.com)
2. Sign up and complete verification
3. Get your API keys from Dashboard → Developers → API keys

### 2. Create Products in Stripe

#### Featured Product - $15
```bash
# Create product
Product Name: Featured Product Launch
Price: $15 USD (one-time)
Description: 15 days of homepage visibility
```

#### Premium Unlimited - $49
```bash
# Create product
Product Name: Premium Unlimited
Price: $49 USD (one-time)
Description: Lifetime unlimited product submissions
```

### 3. Install Stripe Package
```bash
npm install @stripe/stripe-js stripe
```

## Implementation

### File: `src/lib/stripe/config.ts`
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

### File: `src/app/api/create-checkout/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, productId, userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      metadata: {
        productId,
        userId,
        type: priceId === process.env.STRIPE_FEATURED_PRICE_ID ? 'featured' : 'premium',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
```

### File: `src/app/api/webhook/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { productId, userId, type } = session.metadata!;

    try {
      if (type === 'featured') {
        // Update product to featured for 15 days
        const productRef = doc(db, 'products', productId);
        const featuredUntil = new Date();
        featuredUntil.setDate(featuredUntil.getDate() + 15);

        await updateDoc(productRef, {
          featured: true,
          featuredPurchaseDate: serverTimestamp(),
          featuredUntil: featuredUntil,
          updatedAt: serverTimestamp(),
        });
      } else if (type === 'premium') {
        // Update user to premium unlimited
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          isPremium: true,
          premiumSince: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Error updating Firestore:', err);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
```

### File: `src/components/pricing/CheckoutButton.tsx`
```typescript
'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  priceId: string;
  productId?: string;
  children: React.ReactNode;
}

export function CheckoutButton({ priceId, productId, children }: CheckoutButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to continue');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          productId,
          userId: user.uid,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} isLoading={loading}>
      {children}
    </Button>
  );
}
```

### Update Pricing Page Buttons

Replace regular buttons in `src/app/pricing/page.tsx`:

```typescript
import { CheckoutButton } from '@/components/pricing/CheckoutButton';

// For Featured Product
<CheckoutButton priceId={process.env.NEXT_PUBLIC_STRIPE_FEATURED_PRICE_ID!}>
  Get Featured
</CheckoutButton>

// For Premium Unlimited
<CheckoutButton priceId={process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!}>
  Get Premium Unlimited
</CheckoutButton>
```

### Add to Product Detail Page

```typescript
// Feature a specific product
<CheckoutButton 
  priceId={process.env.NEXT_PUBLIC_STRIPE_FEATURED_PRICE_ID!}
  productId={product.id}
>
  Feature This Product - $15
</CheckoutButton>
```

## Environment Variables

Add to Vercel and `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_FEATURED_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

## Testing

### 1. Use Stripe Test Cards
```
Successful payment: 4242 4242 4242 4242
Declined payment: 4000 0000 0000 0002
```

### 2. Test Webhook Locally
```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhook

# Trigger test payment
stripe trigger checkout.session.completed
```

## Cron Job for Featured Products

### File: `src/app/api/cron/unfeatured-products/route.ts`
```typescript
import { NextResponse } from 'next/server';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function GET() {
  try {
    const now = new Date();
    const productsRef = collection(db, 'products');
    
    // Query products that are featured but expired
    const q = query(
      productsRef,
      where('featured', '==', true),
      where('featuredUntil', '<', now)
    );

    const snapshot = await getDocs(q);
    
    const updates = snapshot.docs.map(async (docSnapshot) => {
      const productRef = doc(db, 'products', docSnapshot.id);
      await updateDoc(productRef, {
        featured: false,
        updatedAt: new Date(),
      });
    });

    await Promise.all(updates);

    return NextResponse.json({ 
      success: true, 
      unfeatured: snapshot.size 
    });
  } catch (err) {
    console.error('Error unfeaturing products:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Setup Vercel Cron (vercel.json)
```json
{
  "crons": [
    {
      "path": "/api/cron/unfeatured-products",
      "schedule": "0 0 * * *"
    }
  ]
}
```

## Free Plan Limit Enforcement

### Update `src/app/submit/page.tsx`

Add this check before form submission:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user || !userData) return;
  
  // Check free plan limit
  if (!userData.isPremium && userData.productCount >= 3) {
    setError('You\'ve reached the 3-product limit on the Free plan. Upgrade to Premium Unlimited ($49) for unlimited submissions!');
    return;
  }
  
  // ... rest of submit logic
};
```

## Security Considerations

1. **Verify webhook signatures** - Already implemented in webhook route
2. **Check user authentication** - Use middleware for protected routes
3. **Validate payment amounts** - Double-check on server side
4. **Rate limiting** - Consider adding rate limits to API routes
5. **Idempotency** - Handle duplicate webhooks gracefully

## Go Live Checklist

- [ ] Create Stripe production account
- [ ] Create production products and prices
- [ ] Update environment variables with production keys
- [ ] Configure webhook endpoint in Stripe Dashboard
- [ ] Test with real card (small amount)
- [ ] Set up cron job on Vercel
- [ ] Monitor Stripe Dashboard for payments
- [ ] Set up email notifications for payments

---

**Estimated Implementation Time**: 4-6 hours
**Difficulty**: Medium
**Dependencies**: Stripe account, test cards
