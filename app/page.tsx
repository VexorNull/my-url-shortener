'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const res = await fetch('/api/short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-20 w-full flex flex-col items-center justify-center flex-grow">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          Level 30 High-Performance App
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          VexorNull URL Shortener
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
          Convert bulky links into clean, lightning-fast, and search-engine optimized short URLs.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-indigo-950/20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Destination URL
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/very-long-url-path"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 placeholder-slate-600 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all font-bold rounded-2xl text-white disabled:opacity-50 shadow-lg shadow-indigo-600/30 text-sm tracking-wide cursor-pointer"
          >
            {loading ? 'Processing...' : 'Shorten URL Now'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium animate-pulse">
            {error}
          </div>
        )}
      </div>

      {/* Result Card */}
      {shortUrl && (
        <div className="mt-6 w-full bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="truncate w-full text-center sm:text-left">
            <span className="text-xs text-slate-400 block mb-1">Your Shortened Link:</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline truncate font-semibold text-sm sm:text-base"
            >
              {shortUrl}
            </a>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 transition-colors text-xs font-bold uppercase tracking-wider rounded-xl text-white shrink-0 shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      )}

      {/* Footer / Credit Section */}
      <footer className="mt-16 text-center text-xs text-slate-500 border-t border-slate-900 pt-6 w-full">
        <p className="flex items-center justify-center gap-1.5 flex-wrap">
          Engineered with precision by 
          <span className="text-slate-300 font-semibold">Tanveer Hussain</span>
          <a 
            href="https://github.com/vexornull" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-400 hover:underline font-mono ml-1"
          >
            (@vexornull)
          </a>
        </p>
      </footer>
    </main>
  );
}