'use client';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/checker/${username.replace('@', '')}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setData({ error: 'API error — check token or try again' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'system-ui', minHeight: '100vh', background: '#FFD700' }}>
      <h1 style={{ fontSize: '3.5rem', color: '#000', marginBottom: '10px' }}>
        Zama Season 4 Rank Checker 🟨🔒
      </h1>
      <p style={{ fontSize: '1.4rem', color: '#000', marginBottom: '40px' }}>
        Public tool — type any @username
      </p>

      <div style={{ marginBottom: '50px' }}>
        <input
          placeholder="barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '18px',
            width: '360px',
            fontSize: '1.3rem',
            borderRadius: '15px 0 0 15px',
            border: '4px solid #000',
            outline: 'none'
          }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{
            padding: '18px 40px',
            fontSize: '1.3rem',
            background: '#000',
            color: '#FFD700',
            border: '4px solid #000',
            borderRadius: '0 15px 15px 0',
            cursor: 'pointer'
          }}
        >
          {loading ? 'WAIT...' : 'CHECK RANK'}
        </button>
      </div>

      {data && !data.error && (
        <div style={{
          background: '#000',
          color: '#FFD700',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.8rem'
        }}>
          <h2>@{data.username || username}</h2>
          <p>Posts: <strong>{data.posts || 0}</strong></p>
          <p>Impressions: <strong>{data.impressions || 0}</strong></p>
          <p>ER: <strong>{data.er || '0%'}</strong></p>
          <p>Rank: <strong>{data.estimatedRank || 'Outside Top 5000'}</strong></p>
        </div>
      )}

      {data?.error && (
        <p style={{ color: 'red', fontSize: '1.5rem' }}>{data.error}</p>
      )}
    </div>
  );
}
