import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ensure route runs at request-time

export async function GET(request, { params }) {
  const username = params?.username || "zama";
  const token = process.env.TWITTER_BEARER;

  if (!token) {
    return NextResponse.json({ error: "TWITTER_BEARER missing on server" }, { status: 500 });
  }

  try {
    // request public fields including follower count
    const url = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=public_metrics,verified,description`;
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "zama-checker"
      },
      // ensure no next fetch caching
      next: { revalidate: 0 }
    });

    const data = await resp.json();
    const status = resp.ok ? 200 : (resp.status || 500);
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
