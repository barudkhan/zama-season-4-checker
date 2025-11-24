'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/zama-rank/${username.replace('@', '')}`);
      const json = await res.json();
      if (res.ok) setData(json);
      else setError(json.error || 'Not found');
    } catch {
      setError('Check your internet or try again');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.8rem', color: '#FFD700', marginBottom: '10px' }}>
        Zama Season 4 Rank Checker
      </h1>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        Public tool — type any @username, works for everyone
      </p>

      <div style={{ marginBottom: '40px' }}>
        <input
          placeholder="barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '16px',
            width: '320px',
            fontSize: '1.2rem',
            borderRadius: '12px 0 0 12px',
            border: '2px solid #444',
            background: '#111',
            color: '#fff'
          }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{
            padding: '16px 32px',
            fontSize: '1.2rem',
            background: '#FFD700',
            color: '#000',
            border: 'none',
            borderRadius: '0 12px 12px 0',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading…' : 'Check Rank'}
        </button>
      </div>

      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {data && (
        <div style={{
          padding: '30px',
          background: '#111',
          border: '3px solid #FFD700',
          borderRadius: '16px',
          fontSize: '1.3rem'
        }}>
          <h2 style={{ color: '#FFD700', margin: '0 0 20px 0' }}>@{data.username}</h2>
          <p><strong>Posts:</strong> {data.posts}</p>
          <p><strong>Impressions:</strong> {data.impressions}</p>
          <p><strong>ER:</strong> {data.er}</p>
          <p><strong>Estimated Rank:</strong> {data.estimatedRank}</p>
        </div>
      )}
    </div>
  );
}
