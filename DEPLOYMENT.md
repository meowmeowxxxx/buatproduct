# Deployment Guide - Vercel

This guide walks you through deploying the ProductLaunch Platform to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Firebase project configured
- Stripe account configured
- Email service configured

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 1.2 Ensure `.gitignore` is Correct

Verify these are in `.gitignore`:
```
.env*.local
.env
node_modules/
.next/
```

## Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Select the repository

### 2.2 Configure Project

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `./` (default)
**Build Command:** `npm run build` (default)
**Output Directory:** `.next` (default)

### 2.3 Add Environment Variables

Click "Environment Variables" and add all variables from your `.env.local`:

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
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_FEATURED_PRICE_ID=price_your_price_id

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourplatform.com

# URLs (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_UPVOTES=true
```

**Important Notes:**
- Use **production** Stripe keys (`pk_live_*` and `sk_live_*`)
- For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the entire key including `\n` characters
- Update `NEXT_PUBLIC_APP_URL` after getting your Vercel domain

### 2.4 Deploy

Click "Deploy" and wait for the build to complete (usually 2-5 minutes).

## Step 3: Post-Deployment Configuration

### 3.1 Update Environment Variables

1. Note your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Go to Project Settings > Environment Variables
3. Update these variables:
   - `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`
   - `NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api`
4. Redeploy to apply changes

### 3.2 Configure Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)
5. Update environment variables with custom domain

### 3.3 Configure Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) > Developers > Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.created`
5. Copy the webhook signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy

### 3.4 Update Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Navigate to Authentication > Settings > Authorized domains
3. Add your Vercel domain: `your-app.vercel.app`
4. Add custom domain if configured

## Step 4: Verify Deployment

### 4.1 Test Core Functionality

- [ ] Landing page loads correctly
- [ ] Analytics dashboard displays
- [ ] User signup/login works
- [ ] Product creation works
- [ ] Image upload works
- [ ] Product submission works
- [ ] Email notifications are sent
- [ ] Upvoting works
- [ ] Search and filters work

### 4.2 Test Admin Features

- [ ] Admin can access admin dashboard
- [ ] Product approval works
- [ ] User management works
- [ ] Analytics are visible

### 4.3 Test Stripe Integration

- [ ] Checkout session creation works
- [ ] Payment processing works
- [ ] Webhook receives events
- [ ] Product becomes featured after payment
- [ ] Billing portal works

## Step 5: Production Optimizations

### 5.1 Enable Vercel Analytics

1. Go to Project Settings > Analytics
2. Enable Web Analytics
3. Add analytics snippet (optional)

### 5.2 Configure Edge Functions

For better performance, configure edge functions:

```typescript
// src/middleware.ts
export const config = {
  matcher: [
    '/api/analytics/track',
    '/api/products',
  ],
};
```

### 5.3 Set up Monitoring

1. **Error Tracking**: Integrate Sentry
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

2. **Performance Monitoring**: Use Vercel Analytics
3. **Uptime Monitoring**: Use UptimeRobot or similar

### 5.4 Optimize Images

Images are automatically optimized by Next.js Image component. Ensure you're using it:

```tsx
import Image from 'next/image';

<Image
  src={logo}
  alt={name}
  width={200}
  height={200}
  priority
/>
```

### 5.5 Enable Caching

Add caching headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/products',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=60, stale-while-revalidate',
        },
      ],
    },
  ];
}
```

## Step 6: Set Up CI/CD with GitHub Actions

### 6.1 Create Workflow File

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript check
        run: npm run type-check
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}

  deploy:
    needs: lint-and-type-check
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 6.2 Add GitHub Secrets

1. Go to GitHub repository > Settings > Secrets and variables > Actions
2. Add secrets:
   - `VERCEL_TOKEN`: Get from Vercel Account Settings > Tokens
   - `VERCEL_ORG_ID`: Get from Vercel project settings
   - `VERCEL_PROJECT_ID`: Get from Vercel project settings
   - All environment variables needed for build

## Step 7: Security Checklist

- [ ] All sensitive data in environment variables
- [ ] Firebase rules deployed and tested
- [ ] Stripe webhook signature verification enabled
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] CORS configured correctly
- [ ] Rate limiting implemented (if needed)
- [ ] Input validation on all API routes
- [ ] Authentication required on protected routes
- [ ] Admin-only routes protected

## Step 8: Performance Checklist

- [ ] Images optimized with Next.js Image
- [ ] API responses cached where appropriate
- [ ] Database queries optimized
- [ ] Unused dependencies removed
- [ ] Bundle size analyzed and optimized
- [ ] Lighthouse score > 90

## Troubleshooting

### Build Fails

**Issue**: Build fails on Vercel
**Solution**: 
- Check build logs for errors
- Ensure all environment variables are set
- Test build locally: `npm run build`
- Check Node.js version matches

### Firebase Connection Issues

**Issue**: Can't connect to Firebase
**Solution**:
- Verify Firebase config in environment variables
- Check Firebase project permissions
- Ensure Vercel domain is in Firebase authorized domains

### Stripe Webhook Not Working

**Issue**: Webhook events not received
**Solution**:
- Verify webhook URL is correct
- Check webhook signing secret
- Test webhook with Stripe CLI
- Check Vercel function logs

### Email Not Sending

**Issue**: Emails not being sent
**Solution**:
- Check email credentials
- Verify SMTP settings
- Check Vercel function logs
- Test email locally first

### 500 Internal Server Error

**Issue**: API routes returning 500 errors
**Solution**:
- Check Vercel function logs
- Verify environment variables
- Check Firebase Admin SDK credentials
- Test API routes locally

## Monitoring & Maintenance

### Daily Tasks
- Check error rates in Vercel dashboard
- Monitor email delivery
- Review Stripe payment logs

### Weekly Tasks
- Review analytics
- Check for failed webhooks
- Review user feedback
- Update dependencies (security patches)

### Monthly Tasks
- Review Firebase usage and costs
- Review Stripe transactions
- Optimize slow queries
- Update dependencies
- Review and update documentation

## Scaling Considerations

When your app grows:

1. **Database**: Consider Firestore limits and upgrade plan
2. **Storage**: Monitor Firebase Storage usage
3. **Functions**: Consider Vercel Pro plan for more function execution time
4. **Email**: Switch to dedicated email service (SendGrid, Postmark)
5. **Search**: Add Algolia for better search
6. **CDN**: Already handled by Vercel
7. **Caching**: Add Redis for session/cache management

## Rollback Procedure

If deployment has issues:

1. Go to Vercel Dashboard > Deployments
2. Find last working deployment
3. Click "..." > "Promote to Production"
4. Fix issues locally
5. Redeploy when ready

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

**Congratulations!** Your ProductLaunch Platform is now live! 🎉
