'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!username) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/zama-rank/${username.replace('@', '')}`);
      const json = await res.json();
      if (res.ok) setData(json);
      else setError(json.error || 'User not found');
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#FFD700' }}>
        <p style={{ color: '#aaa' }}>Type any @username – works for everyone</p>
      <div style={{ margin: '30px 0' }}>
        <input
          placeholder="barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '15px', width: '320px', fontSize: '1.1rem', borderRadius: '8px 0 0 8px', border: '1px solid #444' }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{ padding: '15px 25px', fontSize: '1.1rem', background: '#FFD700', color: '#000', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}
        >
          {loading ? 'Loading…' : 'Check Rank'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ padding: '25px', background: '#111', border: '2px solid #FFD700', borderRadius: '12px' }}>
          <h2 style={{ color: '#FFD700', margin: '0 0 15px 0' }}>@{data.username}</h2>
          <p><strong>Posts:</strong> {data.posts}</p>
          <p><strong>Impressions:</strong> {data.impressions}</p>
          <p><strong>ER:</strong> {data.er}</p>
          <p><strong>Estimated Rank:</strong> {data.estimatedRank}</p>
        </div>
      )}
    </div>
  );
}
