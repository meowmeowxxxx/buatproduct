# Firebase & Environment Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name and follow setup wizard
4. Enable Google Analytics (optional)

## Step 2: Get Firebase Config

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the config values from `firebaseConfig` object

## Step 3: Update .env.local with Firebase Config

Replace these values in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your_apiKey>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_authDomain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_projectId>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_storageBucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_messagingSenderId>
NEXT_PUBLIC_FIREBASE_APP_ID=<your_appId>
```

## Step 4: Enable Firebase Services

### Enable Authentication:
1. Go to Authentication > Get Started
2. Click "Email/Password" in Sign-in method tab
3. Enable it and save

### Enable Firestore Database:
1. Go to Firestore Database > Create database
2. Start in **production mode** (we have custom rules)
3. Choose a location close to your users

### Enable Storage:
1. Go to Storage > Get started
2. Start in **production mode** (we have custom rules)
3. Use default location

## Step 5: Get Firebase Admin SDK Credentials

1. In Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy values to `.env.local`:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep quotes and \n)

## Step 6: Deploy Firebase Security Rules

```powershell
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore (rules and indexes)
# - Storage
# Use existing project and select your project

# Deploy rules and indexes
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

## Step 7: Setup Stripe (Optional - for featured listings)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or login
3. Get API keys from Developers > API keys
4. Copy to `.env.local`:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

### Create Featured Product Price:
1. Go to Products > Add Product
2. Name: "Featured Listing"
3. Pricing: Recurring, Monthly, $29/month (or your price)
4. Save and copy Price ID → `STRIPE_FEATURED_PRICE_ID`

### Setup Webhook (after deployment):
1. Go to Developers > Webhooks > Add endpoint
2. URL: `https://your-domain.com/api/stripe/webhook`
3. Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET`

## Step 8: Setup Email (Optional - for notifications)

### Using Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account > Security > 2-Step Verification > App passwords
   - Select "Mail" and "Other" (custom name)
   - Copy the 16-character password
3. Update `.env.local`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=<16-char-app-password>
   EMAIL_FROM=noreply@yourplatform.com
   ```

### Using Other SMTP Services:
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587
- **AWS SES**: email-smtp.region.amazonaws.com, port 587

## Step 9: Restart Development Server

```powershell
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## Step 10: Create First Admin User

1. Open http://localhost:3000
2. Create an account via signup
3. Go to Firebase Console > Firestore Database
4. Find your user document in `users` collection
5. Edit the document and change `role` field to `"admin"`

## Troubleshooting

### Firebase Error: Invalid API Key
- Make sure all Firebase env vars are set correctly
- Restart dev server after updating .env.local

### Stripe Error: No API Key
- Set `NEXT_PUBLIC_ENABLE_PAYMENTS=false` to disable Stripe temporarily

### Email Error: Invalid Login
- For Gmail, make sure you're using App Password, not regular password
- Check if 2FA is enabled on your Google account

## What's Next?

After setup is complete, you can:
- Access the landing page at http://localhost:3000
- Sign up and create your first product
- Make yourself admin to access admin features
- Continue building UI components and pages

## Quick Test Checklist

- [ ] Landing page loads without errors
- [ ] Can sign up with email/password
- [ ] Can sign in
- [ ] Can view products
- [ ] Admin can access admin routes
- [ ] Products can be created (drafts)
- [ ] Email notifications work (if configured)
- [ ] Stripe checkout works (if configured)

## Need Help?

Refer to these documentation files:
- `README.md` - Full project overview
- `QUICKSTART.md` - Quick start guide
- `API_DOCUMENTATION.md` - API routes documentation
- `DEPLOYMENT.md` - Production deployment guide
