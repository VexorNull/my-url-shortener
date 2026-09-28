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
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
      color: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '550px',
        width: '100%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        
        {/* Badge */}
        <div style={{
          padding: '6px 16px',
          marginBottom: '24px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#818cf8',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '50px',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)'
        }}>
          Level 30 Glassmorphism 3.0
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            letterSpacing: '-1px',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            VexorNull Shortener
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
            Transform bulky links into clean, lightning-fast, custom branded short URLs with advanced glass styling.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div style={{
          width: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.1)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: '8px' }}>
                Destination URL <span style={{ color: '#818cf8' }}>*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com/very-long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(3, 7, 18, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  outline: 'none',
                  color: '#f3f4f6',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: '8px' }}>
                Custom Alias <span style={{ color: '#64748b', fontSize: '0.75rem' }}>(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. my-custom-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(3, 7, 18, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  outline: 'none',
                  color: '#f3f4f6',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? 'Creating Short Link...' : 'Generate Short Link'}
            </button>
          </form>

          {error && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Success Output Glass Card */}
        {shortUrl && (
          <div style={{
            marginTop: '24px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Your Branded Short Link:</span>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600, wordBreak: 'break-all', fontSize: '0.95rem' }}
              >
                {shortUrl}
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer'
              }}
            >
              {copied ? 'Copied Successfully!' : 'Copy Link'}
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{
        padding: '20px',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#64748b',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(3, 7, 18, 0.5)'
      }}>
        <p style={{ margin: 0 }}>
          Engineered with precision by <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Tanveer Hussain</span> 
          <a href="https://github.com/vexornull" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'none', marginLeft: '6px', fontFamily: 'monospace' }}>
            (@vexornull)
          </a>
        </p>
      </footer>
    </main>
  );
}