import { stripe, STRIPE_FEATURED_PRICE_ID } from './config';
import Stripe from 'stripe';

/**
 * Create a Stripe Checkout Session for featuring a product
 */
export async function createCheckoutSession(
  productId: string,
  productName: string,
  userId: string,
  userEmail: string
): Promise<Stripe.Checkout.Session> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_FEATURED_PRICE_ID,
        quantity: 1,
      },
    ],
    customer_email: userEmail,
    client_reference_id: userId,
    metadata: {
      productId,
      productName,
      userId,
    },
    success_url: `${baseUrl}/dashboard/products?featured=success`,
    cancel_url: `${baseUrl}/dashboard/products?featured=cancelled`,
    subscription_data: {
      metadata: {
        productId,
        userId,
      },
    },
  });

  return session;
}

/**
 * Create a billing portal session
 */
export async function createBillingPortalSession(
  customerId: string
): Promise<Stripe.BillingPortal.Session> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${baseUrl}/dashboard/products`,
  });

  return session;
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  return customers.data[0] || null;
}

/**
 * Create a customer
 */
export async function createCustomer(
  email: string,
  name: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  return stripe.customers.create({
    email,
    name,
    metadata,
  });
}

/**
 * Get or create customer
 */
export async function getOrCreateCustomer(
  email: string,
  name: string,
  userId: string
): Promise<Stripe.Customer> {
  const existingCustomer = await getCustomerByEmail(email);
  
  if (existingCustomer) {
    return existingCustomer;
  }

  return createCustomer(email, name, { userId });
}

/**
 * Get subscription by ID
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
