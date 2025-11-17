# Quick Start Guide

Get your ProductLaunch Platform up and running in under 30 minutes!

## Prerequisites

Ensure you have these installed:
- Node.js 18 or higher
- npm 9 or higher
- Git

## Step 1: Install Dependencies (2 minutes)

```bash
cd buatprodct
npm install
```

This will install all required packages including Next.js, React, Firebase, Stripe, and more.

## Step 2: Firebase Setup (10 minutes)

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "ProductLaunch")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Required Services

**Firestore Database:**
1. Go to Build > Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location closest to you
5. Click "Enable"

**Authentication:**
1. Go to Build > Authentication
2. Click "Get started"
3. Click "Email/Password"
4. Enable "Email/Password"
5. Click "Save"

**Storage:**
1. Go to Build > Storage
2. Click "Get started"
3. Start in production mode
4. Click "Done"

### Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register app (name: ProductLaunch Web)
5. Copy the config values

### Get Admin SDK Key

1. In Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Save the JSON file securely
5. You'll extract values from this file

## Step 3: Stripe Setup (5 minutes)

### Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up or login

### Get API Keys

1. Click "Developers" in the left menu
2. Click "API keys"
3. Copy the "Publishable key" (starts with pk_test_)
4. Reveal and copy "Secret key" (starts with sk_test_)

### Create Product for Featured Listings

1. Click "Products" in left menu
2. Click "+ Add product"
3. Name: "Featured Listing"
4. Description: "Monthly featured listing"
5. Set price: $29.00 recurring monthly
6. Click "Save product"
7. Copy the **Price ID** (starts with price_)

## Step 4: Email Setup (3 minutes)

### Using Gmail (Recommended for Testing)

1. Go to your Google Account
2. Navigate to Security
3. Enable 2-Step Verification
4. Go to "App passwords"
5. Select "Mail" and "Other" (name it: ProductLaunch)
6. Click "Generate"
7. Copy the 16-character password

## Step 5: Configure Environment Variables (5 minutes)

Copy the example file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Firebase (from Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc

# Firebase Admin (from downloaded JSON file)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMII...your...key...here\n-----END PRIVATE KEY-----\n"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_... (leave empty for now, we'll set this later)
STRIPE_FEATURED_PRICE_ID=price_1...

# Email (Gmail App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=noreply@yourplatform.com

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_UPVOTES=true
```

**Important**: For `FIREBASE_ADMIN_PRIVATE_KEY`, copy the entire key including `\n` characters from the JSON file.

## Step 6: Deploy Firebase Rules (2 minutes)

Install Firebase CLI:

```bash
npm install -g firebase-tools
```

Login:

```bash
firebase login
```

Initialize (if not already done):

```bash
firebase init
```

Select:
- Firestore
- Storage
- Choose existing project
- Use default file names

Deploy rules:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

## Step 7: Start Development Server (1 minute)

```bash
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000)

You should see the landing page! 🎉

## Step 8: Create Your First Admin User (3 minutes)

1. Click "Sign Up" on the landing page
2. Fill in your details:
   - Email
   - Password
   - Username
   - Display Name
3. Click "Sign Up"

4. Make yourself admin:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Open your project
   - Go to Firestore Database
   - Find the `users` collection
   - Find your user document
   - Edit the `role` field
   - Change from `user` to `admin`
   - Save

Now you have admin access!

## Step 9: Test Core Features

### Create a Product

1. Login to your account
2. Go to Dashboard
3. Click "New Product"
4. Fill in:
   - Product name
   - Slug (auto-generated)
   - Description
   - Short description
   - Upload logo
   - Select category
   - Add tags
5. Click "Save as Draft"

### Submit for Approval

1. Go to your product
2. Click "Submit for Review"
3. As admin, go to Admin Dashboard
4. See pending products
5. Approve it

### Test Upvoting

1. Logout
2. Create another user account
3. View products
4. Click upvote on a product
5. Check email for notification

## Step 10: Setup Stripe Webhooks for Local Testing

Install Stripe CLI:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
See: https://stripe.com/docs/stripe-cli
```

Login to Stripe:

```bash
stripe login
```

Forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret. Copy it and add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart your dev server for changes to take effect.

## Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Firebase Admin Key Error

Make sure the private key in `.env.local`:
- Is wrapped in double quotes
- Contains `\n` characters (don't replace them)
- Has no extra spaces or line breaks

### Email Not Sending

- Verify you're using an App Password, not your regular Gmail password
- Check that 2-Step Verification is enabled
- Try a different email service if Gmail doesn't work

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### TypeScript Errors

These are normal before dependencies are installed. Run:

```bash
npm install
```

All errors should resolve.

## What's Next?

Now that you have the basic setup running:

1. **Complete the UI Components**: Build remaining components in `src/components/ui/`
2. **Create API Routes**: Implement routes in `src/app/api/`
3. **Build Pages**: Create remaining pages (login, signup, dashboard, admin)
4. **Test Everything**: Use the testing checklist in PROJECT_SUMMARY.md
5. **Deploy to Vercel**: Follow DEPLOYMENT.md

## Development Tips

### Hot Reload

Next.js automatically reloads when you save files. Just edit and see changes instantly.

### View Firestore Data

Use Firebase Console > Firestore Database to see your data in real-time.

### Test Stripe Payments

Use test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

### Check Logs

- **Client errors**: Browser console (F12)
- **Server errors**: Terminal where `npm run dev` is running
- **Firebase errors**: Firebase Console > Functions logs
- **Stripe errors**: Stripe Dashboard > Developers > Logs

## Need Help?

- Read the full [README.md](./README.md)
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview

## Troubleshooting Commands

```bash
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 9+

# Verify Firebase login
firebase projects:list

# Test Stripe connection
stripe charges list --limit 3

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install

# Check for TypeScript errors
npm run type-check

# Run linter
npm run lint
```

## Success Checklist

- [ ] Dependencies installed
- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Authentication enabled
- [ ] Storage enabled
- [ ] Firebase rules deployed
- [ ] Stripe account created
- [ ] Product and price created
- [ ] Email configured
- [ ] Environment variables set
- [ ] Dev server running
- [ ] Landing page loads
- [ ] Can create account
- [ ] Made yourself admin
- [ ] Can create product

## Time Estimates

- **Full setup**: 25-30 minutes
- **First product**: 5 minutes
- **Testing core features**: 15 minutes
- **Total to working MVP**: ~1 hour

---

🎉 **Congratulations! You're ready to build!** 🚀

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)
