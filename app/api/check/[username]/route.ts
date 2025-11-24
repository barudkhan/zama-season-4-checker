import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const client = new TwitterApi(process.env.TWITTER_BEARER!);

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const u = params.username.toLowerCase();

  try {
    const { data } = await client.v2.searchAll({
      query: `from:${u} #ZamaCreatorProgram since:2025-11-01 -is:retweet`,
      tweet_fields: ['public_metrics'],
      max_results: 100,
    });

    let posts = 0;
    let impressions = 0;
    let engagement = 0;

    data?.forEach((t) => {
      const m = t.public_metrics!;
      if (m.impression_count > 0) {
        posts++;
        impressions += m.impression_count;
        engagement += m.like_count + m.retweet_count + m.quote_count;
      }
    });

    const er = impressions ? ((engagement / impressions) * 100).toFixed(1) : '0.0';

    let rank = 'Outside Top 5000';
    if (impressions > 150000) rank = 'Top 300';
    else if (impressions > 90000) rank = 'Top 500';
    else if (impressions > 55000) rank = 'Top 700';
    else if (impressions > 35000) rank = 'Top 1000';
    else if (impressions > 15000) rank = 'Top 2000';

    return NextResponse.json({
      user: u,
      posts,
      impressions: impressions.toLocaleString(),
      er: er + '%',
      rank,
    });
  } catch {
    return NextResponse.json({ error: 'not found or rate limited' });
  }
}
