# ProductLaunch Platform

A complete, production-ready full-stack platform where entrepreneurs can showcase their SaaS, Micro SaaS, digital products, and startups. Built with Next.js 14, React, TypeScript, Firebase, and Stripe.

## Features

### Core Features
- ✅ User authentication (Firebase Auth)
- ✅ User profiles with customizable information
- ✅ Product submission with draft/published states
- ✅ Admin approval workflow
- ✅ Real-time analytics dashboard
- ✅ Product upvoting system
- ✅ Featured listings with Stripe subscriptions
- ✅ Image upload for product logos
- ✅ Search, filter, and sort functionality
- ✅ SEO optimization with meta tags
- ✅ Email notifications for key events
- ✅ Mobile-responsive design
- ✅ Real-time updates via Firestore listeners

### User Roles
- **Regular Users**: Can create, edit, and submit products
- **Admin Users**: Can approve/reject products, manage users, and view analytics

### Product States
- **Draft**: Saved but not submitted
- **Submitted**: Awaiting admin approval
- **Published**: Live and visible to all
- **Suspended**: Temporarily hidden by admin

### Notifications
Users receive email notifications for:
- Product approval
- Product rejection (with reason)
- Payment success
- Product upvotes

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Payments**: Stripe (Subscriptions)
- **Email**: Nodemailer (SMTP)
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ and npm 9+
- A Firebase project
- A Stripe account
- An email service (Gmail recommended for development)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd buatprodct
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database
4. Enable Authentication (Email/Password provider)
5. Enable Storage
6. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

### 4. Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers > API keys
3. Create a subscription product and price:
   - Go to Products > Add product
   - Set up a subscription price (e.g., $29/month)
   - Copy the Price ID

4. Set up webhooks:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STRIPE_FEATURED_PRICE_ID=price_your_price_id

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourplatform.com

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Note for Gmail**: Use an App Password, not your regular password. Generate one at: https://myaccount.google.com/apppasswords

### 6. Deploy Firebase Rules

Install Firebase CLI:

```bash
npm install -g firebase-tools
```

Login and initialize:

```bash
firebase login
firebase init
```

Deploy Firestore rules and indexes:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

### 7. Create First Admin User

After starting the app and creating your first user, you need to manually set them as admin:

1. Go to Firebase Console > Firestore
2. Find your user document in the `users` collection
3. Edit the `role` field to `admin`

Alternatively, use Firebase CLI:

```bash
firebase firestore:update users/YOUR_USER_ID --data '{"role":"admin"}'
```

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

See [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md) for detailed project structure.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Key Features Explained

### Real-Time Analytics

The platform tracks:
- Total visits, unique visitors, and page views
- Daily and monthly statistics
- Product-specific metrics

Analytics are stored in Firestore and update in real-time using Firestore listeners.

### Product Submission Flow

1. User creates a draft product
2. User submits product for review
3. Admin reviews and approves/rejects
4. If approved, product goes live
5. If rejected, user receives email with reason

### Featured Listings

Users can pay to feature their products:
1. Click "Feature Product" on their product
2. Redirected to Stripe Checkout
3. After payment, product appears at top with badge
4. Subscription auto-renews monthly
5. User can cancel anytime via billing portal

### Upvoting System

- One upvote per user per product
- Users can remove their upvote
- Products sorted by upvotes (optional)
- Owner receives email notification

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions to Vercel.

## Security Considerations

1. **Firebase Rules**: Strict security rules enforce data access
2. **API Authentication**: All API routes validate Firebase tokens
3. **Input Validation**: Server-side validation using Zod
4. **Stripe Webhooks**: Signature verification prevents tampering
5. **Rate Limiting**: Implement rate limiting for production
6. **Environment Variables**: Never commit `.env.local` to git

## Troubleshooting

### Firebase Authentication Issues
- Ensure Email/Password provider is enabled in Firebase Console
- Check that Firebase config is correct in `.env.local`

### Stripe Webhook Issues
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Verify webhook signature secret matches your `.env.local`

### Email Not Sending
- For Gmail, use App Password, not regular password
- Enable "Less secure app access" if using regular SMTP
- Check spam folder

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Run `npm run type-check` to identify issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation files
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions

## Roadmap

Future enhancements:
- Advanced search with Algolia
- Comment system
- User following
- Advanced analytics charts
- Public API
- Mobile app

---

Built with ❤️ using Next.js, Firebase, and Stripe
