import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://rare-chipmunk-314226.upstash.io',
  token: 'gQAAAAAABMtyAAIgcDJjMTY0ZWQwNGU0ZTY0MWEwOGM0ODBmMjc1ODdiZWYxOA',
});

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const rawCode = params.code;
    
    if (!rawCode || rawCode === 'favicon.ico') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Case-insensitive match ke liye lowercase ya exact match check karein
    const code = rawCode.trim();
    let originalUrl = await redis.get<string>(code);

    // Agar exact match na mile toh lowercase karke check karein
    if (!originalUrl) {
      originalUrl = await redis.get<string>(code.toLowerCase());
    }

    if (!originalUrl) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.redirect(originalUrl);
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}