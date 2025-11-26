import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // force runtime execution

export async function GET(request, { params }) {
  const username = params?.username || "zama";
  const token = process.env.TWITTER_BEARER;

  if (!token) {
    return NextResponse.json(
      { error: "TWITTER_BEARER missing on server" },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=public_metrics,verified,description`;
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "zama-checker"
      }
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
