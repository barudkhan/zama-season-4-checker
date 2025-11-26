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
      const res = await fetch(`/api/checker/${encodeURIComponent(username || "zama")}`);
      const json = await res.json();
      if (!res.ok) setError(json.error || JSON.stringify(json));
      else setResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: "28px auto", padding: 12 }}>
      <h2>Zama Rank Checker</h2>
      <form onSubmit={handleCheck} style={{ marginBottom: 12 }}>
        <input
          placeholder="Twitter username (without @). Example: zama"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 8, width: "60%", marginRight: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {error && <div style={{ color: "#900", marginBottom: 12 }}><strong>Error:</strong> {error}</div>}

      {result && (
        <div style={{ border: "1px solid #ddd", padding: 12 }}>
          <h3>Result</h3>
          {result.data ? (
            <>
              <p><strong>Name:</strong> {result.data.name}</p>
              <p><strong>Username:</strong> @{result.data.username}</p>
              <p><strong>Verified:</strong> {String(result.data.verified)}</p>
              <p><strong>Followers:</strong> {result.data.public_metrics?.followers_count ?? "-"}</p>
              <p><strong>Description:</strong> {result.data.description}</p>
            </>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
