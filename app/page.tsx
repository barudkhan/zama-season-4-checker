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
      if (res.ok) setData(json);
      else setError(json.error || 'No posts found');
    } catch {
      setError('API error — check token or try again');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', maxWidth: '700px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: '#000', marginBottom: '10px' }}>Zama Season 4 Rank Checker</h1>
      <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '40px' }}>Public tool — type ANY @username to check their real-time Zama stats!</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <input
          placeholder="e.g., barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '15px', width: '350px', fontSize: '1.1rem', border: '2px solid #000', borderRadius: '10px 0 0 10px', background: '#fff', color: '#000', outline: 'none' }}
        />
        <button
          onClick={check}
          disabled={loading || !username}
          style={{ padding: '15px 25px', fontSize: '1.1rem', background: '#000', color: '#FFD700', border: '2px solid #000', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Rank'}
        </button>
      </div>
      {error && <p style={{ color: 'red', fontSize: '1.2rem', marginBottom: '30px' }}>{error}</p>}
      {data && (
        <div style={{ padding: '30px', background: '#000', color: '#FFD700', borderRadius: '15px', fontSize: '1.3rem' }}>
          <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>{data.username}</h2>
          <p><strong>Posts:</strong> {data.posts}</p>
          <p><strong>Impressions:</strong> {data.impressions}</p>
          <p><strong>ER:</strong> {data.er}</p>
          <p><strong>Estimated Rank:</strong> {data.estimatedRank}</p>
          <p style={{ fontSize: '1rem', color: '#aaa' }}>Updated: {new Date(data.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
