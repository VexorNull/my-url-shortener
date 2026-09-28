'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
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
        body: JSON.stringify({ url, customCode }),
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
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div className="max-w-2xl mx-auto px-4 py-16 w-full flex flex-col items-center justify-center flex-grow">
        
        {/* Badge */}
        <span className="px-3.5 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          Level 30 Pro URL Shortener
        </span>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            VexorNull Shortener
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            Transform bulky links into clean, lightning-fast, custom branded short URLs.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-indigo-950/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Destination URL <span className="text-indigo-400">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com/very-long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 placeholder-slate-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Custom Alias <span className="text-slate-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. my-custom-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 placeholder-slate-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all font-bold rounded-2xl text-white disabled:opacity-50 shadow-lg shadow-indigo-600/30 text-sm tracking-wide cursor-pointer"
            >
              {loading ? 'Creating Short Link...' : 'Generate Short Link'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Success Output */}
        {shortUrl && (
          <div className="mt-6 w-full bg-slate-900 border border-indigo-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="truncate w-full text-center sm:text-left">
              <span className="text-xs text-slate-400 block mb-1">Your Branded Short Link:</span>
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

      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900 w-full">
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