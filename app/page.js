'use client';

import { useState } from 'react';

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setResponse(data.text || '');
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>AI learning tool</h1>
      <p style={styles.subtitle}>Prompt Gemini and see the response below.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          rows={4}
          style={styles.textarea}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <section style={styles.responseSection}>
          <h2 style={styles.responseTitle}>Response</h2>
          <div style={styles.responseBox}>{response}</div>
        </section>
      )}
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 640,
    margin: '0 auto',
    padding: 32,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  h1: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  textarea: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 8,
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 600,
    background: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  error: {
    color: '#c5221f',
    marginTop: 16,
  },
  responseSection: {
    marginTop: 32,
  },
  responseTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: 8,
  },
  responseBox: {
    padding: 16,
    background: '#f5f5f5',
    borderRadius: 8,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
  },
};
