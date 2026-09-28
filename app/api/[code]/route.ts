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
    const code = params.code;
    
    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const originalUrl = await redis.get<string>(code);

    if (!originalUrl) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.redirect(originalUrl);
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}