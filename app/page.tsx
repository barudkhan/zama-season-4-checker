```tsx
'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setData(null);
    const res = await fetch(`/api/check/${username.replace('@', '')}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <main style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#000', margin: '0 0 10px 0' }}>
        ZAMA S4 CHECKER
      </h1>
      <p style={{ fontSize: '1.6rem', color: '#000', marginBottom: '50px' }}>
        Created by @barudkhanweb3
      </p>

      <div style={{ marginBottom: '60px' }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username only"
          style={{ padding: '20px', width: '380px', fontSize: '1.4rem', border: '5px solid #000', borderRight: 'none', borderRadius: '20px 0 0 20px' }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{ padding: '20px 50px', fontSize: '1.4rem', background: '#000', color: '#FFD700', border: '5px solid #000', borderRadius: '0 20px 20px 0', cursor: 'pointer' }}
        >
          {loading ? 'WAIT' : 'CHECK'}
        </button>
      </div>

      {data && (
        <div style={{ background: '#000', color: '#FFD700', padding: '50px', borderRadius: '25px', maxWidth: '600px', margin: '0 auto', fontSize: '1.8rem' }}>
          <h2>@{data.username || username}</h2>
          <p>Posts: <strong>{data.posts || 0}</strong></p>
          <p>Impressions: <strong>{data.impressions || 0}</strong></p>
          <p>ER: <strong>{data.er || '0%'}</strong></p>
          <p>Rank: <strong>{data.estimatedRank || 'Outside Top 5000'}</strong></p>
        </div>
      )}
    </main>
  );
}
