# ProductLaunch Platform - Directory Structure

```
buatprodct/
├── .github/
│   └── workflows/
│       └── ci.yml                          # GitHub Actions CI/CD pipeline
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── placeholder.png
│   └── robots.txt
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── (auth)/                         # Auth group routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/                    # Protected dashboard routes
│   │   │   ├── layout.tsx                  # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                # User dashboard
│   │   │   ├── products/
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx            # Create new product
│   │   │   │   ├── [id]/
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx        # Edit product
│   │   │   │   └── page.tsx                # My products list
│   │   │   └── profile/
│   │   │       └── page.tsx                # User profile
│   │   ├── (admin)/                        # Admin-only routes
│   │   │   ├── layout.tsx                  # Admin layout
│   │   │   └── admin/
│   │   │       ├── page.tsx                # Admin dashboard
│   │   │       ├── products/
│   │   │       │   ├── page.tsx            # Pending approvals
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx        # Review product
│   │   │       ├── users/
│   │   │       │   └── page.tsx            # User management
│   │   │       └── analytics/
│   │   │           └── page.tsx            # Analytics dashboard
│   │   ├── api/                            # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── signup/
│   │   │   │   │   └── route.ts
│   │   │   │   └── check-role/
│   │   │   │       └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts                # GET (list), POST (create)
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts            # GET, PATCH, DELETE
│   │   │   │   ├── submit/
│   │   │   │   │   └── route.ts            # Submit for approval
│   │   │   │   └── approve/
│   │   │   │       └── route.ts            # Admin approve/reject
│   │   │   ├── upvotes/
│   │   │   │   └── route.ts                # POST (upvote), DELETE (remove)
│   │   │   ├── analytics/
│   │   │   │   ├── track/
│   │   │   │   │   └── route.ts            # Track page view
│   │   │   │   └── stats/
│   │   │   │       └── route.ts            # Get analytics stats
│   │   │   ├── stripe/
│   │   │   │   ├── create-checkout/
│   │   │   │   │   └── route.ts            # Create Stripe Checkout
│   │   │   │   ├── create-portal/
│   │   │   │   │   └── route.ts            # Billing portal
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts            # Stripe webhooks
│   │   │   └── email/
│   │   │       └── send/
│   │   │           └── route.ts            # Send emails
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Public product page
│   │   ├── user/
│   │   │   └── [username]/
│   │   │       └── page.tsx                # Public user profile
│   │   ├── layout.tsx                      # Root layout
│   │   ├── page.tsx                        # Landing page
│   │   ├── loading.tsx                     # Loading UI
│   │   ├── error.tsx                       # Error UI
│   │   └── not-found.tsx                   # 404 page
│   ├── components/                         # React components
│   │   ├── ui/                             # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── Dropdown.tsx
│   │   ├── layout/                         # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── auth/                           # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RoleGuard.tsx
│   │   ├── products/                       # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductSearch.tsx
│   │   │   ├── FeaturedBadge.tsx
│   │   │   └── UpvoteButton.tsx
│   │   ├── analytics/                      # Analytics components
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── AnalyticsChart.tsx
│   │   ├── admin/                          # Admin components
│   │   │   ├── ApprovalQueue.tsx
│   │   │   ├── UserTable.tsx
│   │   │   └── AdminStats.tsx
│   │   └── common/                         # Shared components
│   │       ├── ImageUpload.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── LoadingState.tsx
│   │       └── Pagination.tsx
│   ├── lib/                                # Utility libraries
│   │   ├── firebase/
│   │   │   ├── config.ts                   # Firebase initialization
│   │   │   ├── auth.ts                     # Auth helpers
│   │   │   ├── firestore.ts                # Firestore helpers
│   │   │   ├── storage.ts                  # Storage helpers
│   │   │   └── admin.ts                    # Admin SDK (server-side)
│   │   ├── stripe/
│   │   │   ├── config.ts                   # Stripe initialization
│   │   │   └── helpers.ts                  # Stripe helpers
│   │   ├── email/
│   │   │   ├── templates.ts                # Email templates
│   │   │   └── sender.ts                   # Email sending logic
│   │   ├── analytics/
│   │   │   ├── tracker.ts                  # Analytics tracking
│   │   │   └── aggregator.ts               # Stats aggregation
│   │   ├── utils/
│   │   │   ├── validation.ts               # Zod schemas
│   │   │   ├── slugify.ts                  # URL slug generation
│   │   │   ├── dates.ts                    # Date formatting
│   │   │   └── errors.ts                   # Error handling
│   │   └── constants/
│   │       ├── categories.ts               # Product categories
│   │       ├── roles.ts                    # User roles
│   │       └── statuses.ts                 # Product statuses
│   ├── hooks/                              # Custom React hooks
│   │   ├── useAuth.ts                      # Authentication hook
│   │   ├── useProducts.ts                  # Products data hook
│   │   ├── useAnalytics.ts                 # Analytics hook
│   │   ├── useUpvote.ts                    # Upvote hook
│   │   └── useInfiniteScroll.ts            # Infinite scroll hook
│   ├── contexts/                           # React contexts
│   │   ├── AuthContext.tsx                 # Auth state
│   │   └── ToastContext.tsx                # Toast notifications
│   ├── types/                              # TypeScript types
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── analytics.ts
│   │   └── api.ts
│   ├── styles/
│   │   └── globals.css                     # Global styles + Tailwind
│   └── middleware.ts                       # Next.js middleware (auth)
├── firebase/
│   ├── firestore.rules                     # Firestore security rules
│   ├── storage.rules                       # Storage security rules
│   └── firestore.indexes.json              # Firestore indexes
├── .env.example                            # Example environment variables
├── .env.local                              # Local environment variables (gitignored)
├── .gitignore
├── .eslintrc.json
├── next.config.js                          # Next.js configuration
├── tsconfig.json                           # TypeScript configuration
├── tailwind.config.ts                      # Tailwind CSS configuration
├── postcss.config.js                       # PostCSS configuration
├── package.json
├── package-lock.json
├── README.md                               # Setup and development instructions
├── ARCHITECTURE.md                         # Architecture documentation
├── API_DOCUMENTATION.md                    # API documentation
└── DEPLOYMENT.md                           # Deployment instructions
```

## Key Directory Explanations

### `/app` Directory (App Router)
- **(auth)**, **(dashboard)**, **(admin)**: Route groups for organizing related pages without affecting URL structure
- **api/**: Server-side API routes for backend logic
- **[slug]**, **[id]**: Dynamic routes for products and users

### `/components` Directory
- **ui/**: Reusable, accessible UI primitives
- **layout/**: Page layout components
- **auth/**, **products/**, **analytics/**, **admin/**: Feature-specific components

### `/lib` Directory
- **firebase/**: Firebase SDK configuration and helpers
- **stripe/**: Stripe integration
- **email/**: Email template and sending logic
- **analytics/**: Custom analytics implementation
- **utils/**: Shared utility functions
- **constants/**: Application constants

### `/hooks` Directory
- Custom React hooks for data fetching and state management

### `/contexts` Directory
- React Context providers for global state

### `/types` Directory
- TypeScript type definitions and interfaces

### `/firebase` Directory
- Firebase configuration files (rules, indexes)

## File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Utilities**: camelCase (e.g., `validation.ts`)
- **Pages**: lowercase with kebab-case (e.g., `page.tsx`, `reset-password/`)
- **Constants**: camelCase files, UPPER_CASE exports (e.g., `categories.ts`)
- **Types**: lowercase (e.g., `product.ts`)

## Code Organization Principles

1. **Colocation**: Keep related files close together
2. **Separation of Concerns**: Clear boundaries between UI, logic, and data
3. **Reusability**: Build generic components in `/ui`, compose in feature folders
4. **Type Safety**: Define types in `/types`, import throughout app
5. **Environment-Specific**: Use `/lib` for SDK configs, keep API keys in `.env`
