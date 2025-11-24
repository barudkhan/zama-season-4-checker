'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/check/${username.replace('@', '')}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setData(null);
      }
    } catch (err) {
      setData(null);
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '4rem', color: '#000' }}>ZAMA S4 CHECKER</h1>
      <p style={{ fontSize: '1.8rem', color: '#000', marginBottom: '50px' }}>
        By @barudkhanweb3
      </p>
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          style={{ padding: '20px', width: '400px', fontSize: '1.5rem', border: '5px solid #000', borderRight: 'none', borderRadius: '20px 0 0 20px' }}
        />
        <button
          onClick={check}
          disabled={loading}
          style={{ padding: '20px 60px', fontSize: '1.5rem', background: '#000', color: '#FFD700', border: '5px solid #000', borderRadius: '0 20px 20px 0', cursor: 'pointer' }}
        >
          {loading ? 'WAIT' : 'CHECK'}
        </button>
      </div>
      {data && (
        <div style={{ marginTop: '60px', background: '#000', color: '#FFD700', padding: '50px', borderRadius: '30px', fontSize: '2rem' }}>
          <h2>@{data.username}</h2>
          <p>Posts: {data.posts}</p>
          <p>Impressions: {data.impressions}</p>
          <p>ER: {data.er}</p>
          <p>Rank: {data.rank}</p>
        </div>
      )}
    </main>
  );
}
