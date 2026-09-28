import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';

const redis = new Redis({
  url: 'https://rare-chipmunk-314226.upstash.io',
  token: 'gQAAAAAABMtyAAIgcDJjMTY0ZWQwNGU0ZTY0MWEwOGM0ODBmMjc1ODdiZWYxOA',
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format. Please include http:// or https://' }, { status: 400 });
    }

    const code = nanoid(6);

    await redis.set(code, url);

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const shortUrl = `${protocol}://${host}/${code}`;

    return NextResponse.json({ code, shortUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}