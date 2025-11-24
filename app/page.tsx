'use client';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');
  const [result, setResult] = useState<any>(null);
  const [load, setLoad] = useState(false);

  const go = async () => {
    setLoad(true);
    setResult(null);
    const r = await fetch(`/api/rank/${user.replace('@', '')}`);
    const j = await r.json();
    setResult(j);
    setLoad(false);
  };

  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4.5rem', color: '#000', fontWeight: 'bold' }}>
        ZAMA S4 CHECKER
      </h1>
      <p style={{ fontSize: '2rem', color: '#000', marginBottom: '60px' }}>
        by @barudkhanweb3
      </p>

      <div style={{ marginBottom: '80px' }}>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="username"
          style={{
            padding: '20px',
            width: '400px',
            fontSize: '1.8rem',
            border: '6px solid #000',
            borderRight: 'none',
            borderRadius: '25px 0 0 25px',
            outline: 'none'
          }}
        />
        <button
          onClick={go}
          disabled={load}
          style={{
            padding: '20px 70px',
            fontSize: '1.8rem',
            background: '#000',
            color: '#FFD700',
            border: '6px solid #000',
            borderRadius: '0 25px 25px 0',
            cursor: 'pointer'
          }}
        >
          {load ? 'WAIT' : 'CHECK'}
        </button>
      </div>

      {result && (
        <div style={{
          background: '#000',
          color: '#FFD700',
          padding: '60px',
          borderRadius: '30px',
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '2.2rem',
          fontWeight: 'bold'
        }}>
          <div>@{result.user}</div>
          <div>Posts: {result.posts}</div>
          <div>Impressions: {result.impressions}</div>
          <div>ER: {result.er}</div>
          <div>Rank: {result.rank}</div>
        </div>
      )}
    </main>
  );
}
