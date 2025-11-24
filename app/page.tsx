'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/checker/${username.replace('@', '')}`);
      const json = await res.json();
      if (res.ok && json.posts > 0) {
        setData(json);
      } else {
        setError(json.error || 'No posts found for #ZamaCreatorProgram');
      }
    } catch {
      setError('API error — check token or try again');
    }
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
          disabled={loading || !username}
          style={{ padding: '12px 20px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Rank'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div style={{ padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '12px', border: '1px solid #FFD700' }}>
          <h2 style={{ color: '#FFD700' }}>{data.username}</h2>
          <p><strong>Posts:</strong> {data.posts}</p>
          <p><strong>Impressions:</strong> {data.impressions}</p>
          <p><strong>ER%:</strong> {data.er}</p>
          <p><strong>Estimated Rank:</strong> {data.estimatedRank}</p>
        </div>
      )}
    </div>
  );
}
