# ProductLaunch Platform - Firestore Schema

This document describes the database schema for all Firestore collections.

## Collections Overview

```
firestore
├── users
├── products
├── pageViews
├── visitorSessions
├── dailyStats
├── monthlyStats
├── productAnalytics
└── emailLogs
```

## Collection: `users`

Stores user profile information and settings.

**Document ID**: Firebase Auth UID

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `username` | string | Yes | Unique username (for URLs) |
| `displayName` | string | Yes | User's display name |
| `bio` | string | No | User biography (max 500 chars) |
| `avatar` | string | No | URL to avatar image |
| `website` | string | No | User's website URL |
| `twitter` | string | No | Twitter handle |
| `role` | string | Yes | User role: 'user' or 'admin' |
| `emailVerified` | boolean | Yes | Email verification status |
| `stripeCustomerId` | string | No | Stripe customer ID |
| `createdAt` | timestamp | Yes | Account creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

### Indexes

- `username` (ascending) - for username lookups

### Example Document

```json
{
  "email": "john@example.com",
  "username": "johndoe",
  "displayName": "John Doe",
  "bio": "Indie hacker building SaaS products",
  "avatar": "https://storage.googleapis.com/...",
  "website": "https://johndoe.com",
  "twitter": "@johndoe",
  "role": "user",
  "emailVerified": true,
  "stripeCustomerId": "cus_...",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## Collection: `products`

Stores all product submissions.

**Document ID**: Auto-generated

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Owner's user ID |
| `username` | string | Yes | Owner's username (denormalized) |
| `name` | string | Yes | Product name (3-100 chars) |
| `slug` | string | Yes | URL-friendly slug (unique) |
| `description` | string | Yes | Full description (50-5000 chars) |
| `shortDescription` | string | Yes | Brief description (20-200 chars) |
| `logo` | string | Yes | Product logo URL |
| `category` | string | Yes | Product category |
| `tags` | array | Yes | Array of tag strings (1-10 tags) |
| `websiteUrl` | string | No | Product website URL |
| `status` | string | Yes | Status: 'draft', 'submitted', 'published', 'suspended' |
| `featured` | boolean | Yes | Whether product is featured |
| `featuredUntil` | timestamp | No | Featured expiration date |
| `upvotes` | number | Yes | Total upvote count |
| `upvotedBy` | array | Yes | Array of user IDs who upvoted |
| `views` | number | Yes | Total view count |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |
| `submittedAt` | timestamp | No | Submission timestamp |
| `publishedAt` | timestamp | No | Publication timestamp |
| `rejectionReason` | string | No | Reason if rejected |

### Indexes

1. `status` (asc) + `createdAt` (desc)
2. `userId` (asc) + `createdAt` (desc)
3. `featured` (asc) + `featuredUntil` (desc) + `status` (asc)
4. `category` (asc) + `upvotes` (desc)
5. `status` (asc) + `upvotes` (desc)

### Example Document

```json
{
  "userId": "abc123",
  "username": "johndoe",
  "name": "TaskMaster Pro",
  "slug": "taskmaster-pro",
  "description": "A comprehensive task management tool for teams...",
  "shortDescription": "Powerful task management for modern teams",
  "logo": "https://storage.googleapis.com/.../logo.png",
  "category": "SaaS",
  "tags": ["productivity", "project-management", "collaboration"],
  "websiteUrl": "https://taskmasterpro.com",
  "status": "published",
  "featured": true,
  "featuredUntil": Timestamp,
  "upvotes": 42,
  "upvotedBy": ["user1", "user2", "user3"],
  "views": 235,
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "submittedAt": Timestamp,
  "publishedAt": Timestamp,
  "rejectionReason": null
}
```

## Collection: `pageViews`

Tracks individual page views for analytics.

**Document ID**: Auto-generated

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `visitorId` | string | Yes | Unique visitor identifier |
| `userId` | string | No | User ID if authenticated |
| `path` | string | Yes | Page path viewed |
| `referrer` | string | No | Referrer URL |
| `userAgent` | string | No | Browser user agent |
| `timestamp` | timestamp | Yes | View timestamp |

### Indexes

- `timestamp` (ascending)

### Example Document

```json
{
  "visitorId": "visitor_abc123",
  "userId": "user123",
  "path": "/product/taskmaster-pro",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": Timestamp
}
```

## Collection: `visitorSessions`

Tracks unique visitor sessions.

**Document ID**: Visitor ID

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `visitorId` | string | Yes | Unique visitor identifier |
| `firstVisit` | timestamp | Yes | First visit timestamp |
| `lastVisit` | timestamp | Yes | Most recent visit timestamp |
| `pageCount` | number | Yes | Total pages viewed |

### Example Document

```json
{
  "visitorId": "visitor_abc123",
  "firstVisit": Timestamp,
  "lastVisit": Timestamp,
  "pageCount": 15
}
```

## Collection: `dailyStats`

Aggregated daily analytics.

**Document ID**: Date string (YYYY-MM-DD)

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | string | Yes | Date in YYYY-MM-DD format |
| `visits` | number | Yes | Total visits |
| `uniqueVisitors` | number | Yes | Unique visitor count |
| `pageViews` | number | Yes | Total page views |
| `timestamp` | timestamp | Yes | Last update timestamp |

### Example Document

```json
{
  "date": "2024-01-15",
  "visits": 1234,
  "uniqueVisitors": 856,
  "pageViews": 2451,
  "timestamp": Timestamp
}
```

## Collection: `monthlyStats`

Aggregated monthly analytics.

**Document ID**: Month string (YYYY-MM)

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `month` | string | Yes | Month in YYYY-MM format |
| `visits` | number | Yes | Total visits |
| `uniqueVisitors` | number | Yes | Unique visitor count |
| `pageViews` | number | Yes | Total page views |
| `timestamp` | timestamp | Yes | Last update timestamp |

### Example Document

```json
{
  "month": "2024-01",
  "visits": 35678,
  "uniqueVisitors": 24532,
  "pageViews": 71234,
  "timestamp": Timestamp
}
```

## Collection: `productAnalytics`

Product-specific analytics.

**Document ID**: Product ID

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | string | Yes | Product identifier |
| `userId` | string | Yes | Product owner ID |
| `views` | number | Yes | Total views |
| `upvotes` | number | Yes | Total upvotes |
| `clicks` | number | Yes | Website clicks |
| `dailyViews` | array | Yes | Array of {date, count} objects |

### Example Document

```json
{
  "productId": "prod123",
  "userId": "user123",
  "views": 235,
  "upvotes": 42,
  "clicks": 87,
  "dailyViews": [
    {"date": "2024-01-15", "count": 35},
    {"date": "2024-01-16", "count": 42}
  ]
}
```

## Collection: `emailLogs`

Logs of sent emails (for debugging).

**Document ID**: Auto-generated

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `to` | string | Yes | Recipient email |
| `subject` | string | Yes | Email subject |
| `type` | string | Yes | Email type |
| `status` | string | Yes | 'sent' or 'failed' |
| `error` | string | No | Error message if failed |
| `timestamp` | timestamp | Yes | Send timestamp |

### Example Document

```json
{
  "to": "user@example.com",
  "subject": "Product Approved!",
  "type": "product_approved",
  "status": "sent",
  "error": null,
  "timestamp": Timestamp
}
```

## Data Relationships

```
users (1) ----< (many) products
  |
  |----< (many) upvotes (via upvotedBy array in products)
  |
  |----< (many) pageViews (optional userId)

products (1) ----< (many) upvotes (via upvotedBy array)
  |
  |---- (1) productAnalytics

visitorId ----< (many) pageViews
  |
  |---- (1) visitorSession
```

## Security Considerations

1. **Users**: Readable by all, writable by owner or admin
2. **Products**: Readable if published, writable by owner or admin
3. **Analytics**: Readable by admin, writable by system
4. **Email Logs**: Readable by admin only

## Backup Strategy

1. Daily automated Firestore backups
2. Export analytics data monthly
3. Keep email logs for 30 days

## Scaling Considerations

1. **Sharding**: Consider sharding pageViews by date when > 1M docs
2. **Aggregation**: Daily/monthly stats reduce query load
3. **Indexing**: All composite indexes defined in firestore.indexes.json
4. **Cleanup**: Archive old pageViews after 90 days

## Migration Notes

If you need to migrate data:

```javascript
// Example: Add new field to all products
const products = await getDocs(collection(db, 'products'));
const batch = writeBatch(db);

products.forEach(doc => {
  batch.update(doc.ref, { newField: defaultValue });
});

await batch.commit();
```

---

**Last Updated**: November 2024
**Schema Version**: 1.0
