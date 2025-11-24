"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUser = async () => {
    try {
      setLoading(true);
      setData(null);

      // FIXED TEMPLATE STRING
      const clean = username.replace('@', '');

      const res = await fetch(`/api/check/${clean}`);
      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={checkUser}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Check
      </button>

      {loading && <p>Loading...</p>}

      {data && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
