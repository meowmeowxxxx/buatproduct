import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'launched';
  const productName = searchParams.get('name') || 'Product';

  // SVG badge templates
  const badges = {
    launched: `
      <svg width="180" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="180" height="32" rx="6" fill="#1c1917"/>
        <text x="12" y="21" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="url(#grad1)">
          🚀 Launched on
        </text>
        <text x="12" y="21" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="white" dx="88">
          BuatProduct
        </text>
      </svg>
    `,
    featured: `
      <svg width="200" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="32" rx="6" fill="url(#grad2)"/>
        <text x="12" y="21" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="white">
          ⭐ Featured on BuatProduct
        </text>
      </svg>
    `,
    upvote: `
      <svg width="140" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="140" height="32" rx="6" fill="#ffffff" stroke="url(#grad3)" stroke-width="2"/>
        <text x="12" y="21" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="url(#grad3)">
          👍 Upvote on
        </text>
        <text x="12" y="21" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#1c1917" dx="78">
          BP
        </text>
      </svg>
    `,
  };

  const badgeType = type as keyof typeof badges;
  const svg = badges[badgeType] || badges.launched;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
