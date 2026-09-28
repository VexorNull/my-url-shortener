import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VexorNull URL Shortener | High-Performance Link Shortener by Tanveer Hussain',
  description: 'A lightning fast, secure, and fully optimized URL shortener built by Tanveer Hussain (@vexornull). Transform long links into short tracking URLs instantly.',
  keywords: ['URL Shortener', 'Link Shortener', 'Tanveer Hussain', 'vexornull', 'Next.js Vercel Redis'],
  authors: [{ name: 'Tanveer Hussain', url: 'https://github.com/vexornull' }],
  creator: 'Tanveer Hussain (@vexornull)',
  publisher: 'Tanveer Hussain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vexornull-shortener.vercel.app',
    title: 'VexorNull URL Shortener by Tanveer Hussain',
    description: 'Transform your long URLs into clean, secure, and trackable links instantly.',
    siteName: 'VexorNull URL Shortener',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VexorNull URL Shortener by Tanveer Hussain',
    description: 'Fast, secure & scalable link shortener powered by Next.js & Upstash.',
    creator: '@vexornull',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'VexorNull URL Shortener',
              url: 'https://vexornull-shortener.vercel.app',
              author: {
                '@type': 'Person',
                name: 'Tanveer Hussain',
                alternateName: 'vexornull',
              },
              description: 'Professional-grade URL shortening utility engineered for maximum performance and reliability.',
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}