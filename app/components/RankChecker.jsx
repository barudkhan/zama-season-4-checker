"use client";
import { useState } from "react";

export default function RankChecker() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleCheck(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/checker/${encodeURIComponent(username)}`);
      const data = await res.json();
      if (!res.ok) setError(data.error || JSON.stringify(data));
      else setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <form onSubmit={handleCheck} style={{ marginBottom: 10 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Twitter username (without @)"
          style={{ padding: 8, width: "70%" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: 6 }}>
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && (
        <pre style={{ background: "#eee", padding: 12 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
