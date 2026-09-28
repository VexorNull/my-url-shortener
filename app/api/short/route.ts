import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';

const redis = new Redis({
  url: 'https://rare-chipmunk-314226.upstash.io',
  token: 'gQAAAAAABMtyAAIgcDJjMTY0ZWQwNGU0ZTY0MWEwOGM0ODBmMjc1ODdiZWYxOA',
});

export async function POST(request: Request) {
  try {
    const { url, customCode } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format. Include http:// or https://' }, { status: 400 });
    }

    let code = customCode ? customCode.trim() : nanoid(6);

    if (customCode) {
      const isValid = /^[a-zA-Z0-9-_]+$/.test(code);
      if (!isValid) {
        return NextResponse.json({ error: 'Custom alias can only contain letters, numbers, hyphens and underscores.' }, { status: 400 });
      }

      const existing = await redis.get(code);
      if (existing) {
        return NextResponse.json({ error: 'This custom alias is already taken. Choose another one.' }, { status: 400 });
      }
    }

    await redis.set(code, url);

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const shortUrl = `${protocol}://${host}/${code}`;

    return NextResponse.json({ code, shortUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}