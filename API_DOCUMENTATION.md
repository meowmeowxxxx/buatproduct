# API Documentation

All API routes are located in `src/app/api/` and follow RESTful conventions.

## Authentication

Most API routes require authentication. Include the Firebase ID token in the Authorization header:

```
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

Get the token in your client code:
```typescript
const token = await user.getIdToken();
```

## Response Format

All API responses follow this format:

```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
```

## API Routes

### Authentication

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "johndoe",
  "displayName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user_id",
    "email": "user@example.com"
  }
}
```

#### GET `/api/auth/check-role`
Check the current user's role.

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "data": {
    "role": "user"
  }
}
```

---

### Products

#### GET `/api/products`
Get a list of products.

**Query Parameters:**
- `status` (optional): Filter by status (draft, submitted, published, suspended)
- `userId` (optional): Filter by user ID
- `category` (optional): Filter by category
- `limit` (optional): Number of results (default: 20)
- `cursor` (optional): Pagination cursor

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "My SaaS Product",
      "slug": "my-saas-product",
      "description": "Full description...",
      "shortDescription": "Short description...",
      "logo": "https://storage.url/logo.png",
      "category": "SaaS",
      "tags": ["productivity", "automation"],
      "websiteUrl": "https://example.com",
      "status": "published",
      "featured": false,
      "upvotes": 42,
      "upvotedBy": ["user1", "user2"],
      "views": 150,
      "userId": "user_id",
      "username": "johndoe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/products`
Create a new product.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "name": "My SaaS Product",
  "slug": "my-saas-product",
  "description": "Detailed description of the product...",
  "shortDescription": "Brief one-liner description",
  "logo": "base64_or_url",
  "category": "SaaS",
  "tags": ["productivity", "automation"],
  "websiteUrl": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_product_id"
  }
}
```

#### GET `/api/products/[id]`
Get a single product by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "My SaaS Product",
    ...
  }
}
```

#### PATCH `/api/products/[id]`
Update a product.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Product Name",
  "description": "Updated description...",
  "tags": ["new", "tags"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

#### DELETE `/api/products/[id]`
Delete a product.

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### POST `/api/products/submit`
Submit a product for admin approval.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "productId": "product_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product submitted for review"
}
```

#### POST `/api/products/approve`
Approve or reject a product (Admin only).

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "productId": "product_id",
  "approved": true,
  "rejectionReason": "Reason if rejected" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product approved"
}
```

---

### Upvotes

#### POST `/api/upvotes`
Upvote a product.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "productId": "product_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "upvoted": true,
    "upvoteCount": 43
  }
}
```

#### DELETE `/api/upvotes`
Remove upvote from a product.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "productId": "product_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "upvoted": false,
    "upvoteCount": 42
  }
}
```

---

### Analytics

#### POST `/api/analytics/track`
Track a page view.

**Request Body:**
```json
{
  "path": "/product/my-saas-product",
  "referrer": "https://google.com",
  "visitorId": "unique_visitor_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Page view tracked"
}
```

#### GET `/api/analytics/stats`
Get analytics summary.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisits": 1500,
    "totalUniqueVisitors": 850,
    "totalPageViews": 3200,
    "todayVisits": 45,
    "todayUniqueVisitors": 32,
    "todayPageViews": 87,
    "thisMonthVisits": 450,
    "thisMonthUniqueVisitors": 320,
    "thisMonthPageViews": 980
  }
}
```

---

### Stripe

#### POST `/api/stripe/create-checkout`
Create a Stripe Checkout session for featuring a product.

**Headers:** `Authorization: Bearer TOKEN`

**Request Body:**
```json
{
  "productId": "product_id",
  "priceId": "price_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_...",
    "url": "https://checkout.stripe.com/..."
  }
}
```

#### POST `/api/stripe/create-portal`
Create a Stripe billing portal session.

**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/..."
  }
}
```

#### POST `/api/stripe/webhook`
Stripe webhook endpoint (called by Stripe, not client).

**Headers:** `stripe-signature: webhook_signature`

Handles events:
- `checkout.session.completed`: Feature product after successful payment
- `customer.subscription.updated`: Update subscription status
- `customer.subscription.deleted`: Remove featured status

---

### Email

#### POST `/api/email/send`
Send an email (internal use).

**Request Body:**
```json
{
  "to": "user@example.com",
  "subject": "Product Approved",
  "html": "<html>...</html>"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

## Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

Implement rate limiting in production:
- Public endpoints: 100 requests per minute per IP
- Authenticated endpoints: 1000 requests per minute per user

## Testing API Routes

### Using cURL

```bash
# Get products
curl http://localhost:3000/api/products

# Create product (with auth)
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","slug":"test-product",...}'

# Upvote product
curl -X POST http://localhost:3000/api/upvotes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"product_id"}'
```

### Using Postman

1. Import the API collection (create one if needed)
2. Set Authorization header with Firebase ID token
3. Test each endpoint

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create requests for each endpoint
3. Save as collection for easy testing

## Webhook Testing

### Stripe Webhooks (Local Development)

1. Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

2. Login to Stripe:
```bash
stripe login
```

3. Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Use the webhook signing secret provided by the CLI in your `.env.local`

5. Test with Stripe CLI:
```bash
stripe trigger checkout.session.completed
```

## Best Practices

1. **Always validate input** on server-side, even if client validates
2. **Use TypeScript types** for request/response typing
3. **Handle errors gracefully** with try-catch blocks
4. **Log important events** for debugging
5. **Test with invalid data** to ensure proper error handling
6. **Use environment variables** for sensitive configuration
7. **Implement idempotency** for payment operations
8. **Cache responses** where appropriate for performance

## Next Steps

- Implement rate limiting with Redis
- Add API versioning (e.g., `/api/v1/products`)
- Create OpenAPI/Swagger documentation
- Add request/response logging
- Implement API key authentication for public API
- Add GraphQL endpoint as alternative to REST
