import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const client = new TwitterApi(process.env.TWITTER_BEARER!);

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const username = params.username.toLowerCase();

  try {
    const tweets = await client.v2.searchAll({
      query: `from:${username} #ZamaCreatorProgram since:2025-11-01`, tweet_fields: ['public_metrics'], max_results: 100 });

    let posts = 0, impressions = 0, likes = 0;

    tweets.data?.forEach(t => {
      const m = t.public_metrics;
      if (m?.impression_count) {
        posts++;
        impressions += m.impression_count;
        likes += m.like_count + m.retweet_count + m.quote_count;
      }
    });

    const er = impressions ? ((likes / impressions) * 100).toFixed(1) : 0;

    let rank = 'Outside Top 5000';
    if (impressions > 150000) rank = 'Top 300';
    else if (impressions > 90000) rank = 'Top 500';
    else if (impressions > 55000) rank = 'Top 700';
    else if (impressions > 35000) rank = 'Top 1000';

    return NextResponse.json({ username, posts, impressions: impressions.toLocaleString(), er: er + '%', estimatedRank: rank });
  } catch {
    return NextResponse.json({ error: 'Error — try again' });
  }
}
