'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setData(null);
    const res = await fetch(`/api/checker/${username.replace('@', '')}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#000' }}>Zama Season 4 Rank Checker 🟨🔒</h1>
      <p style={{ color: '#000' }}>Public tool — type ANY @username to check their real-time Zama stats!</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          placeholder="e.g., barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px', width: '300px', border: '1px solid #ccc', borderRadius: '8px 0 0 8px' }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{ padding: '12px 20px', background: '#000', color: '#FFD700', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Rank'}
        </button>
      </div>
      {data && (
        <div style={{ padding: '20px', background: '#000', color: '#FFD700', borderRadius: '12px' }}>
          <h2>{data.username || username}</h2>
          <p>Posts: {data.posts || 0}</p>
          <p>Impressions: {data.impressions || 0}</p>
          <p>ER: {data.er || '0%'}</p>
          <p>Rank: {data.estimatedRank || 'Calculating...'}</p>
        </div>
      )}
    </div>
  );
}
