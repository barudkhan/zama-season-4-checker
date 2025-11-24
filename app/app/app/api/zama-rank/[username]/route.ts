import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const client = new TwitterApi(process.env.TWITTER_BEARER!);

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const username = params.username.toLowerCase();

  try {
    const user = await client.v2.userByUsername(username);
    if (!user.data) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const tweets = await client.v2.searchAll({
      query: `from:${username} #ZamaCreatorProgram since:2025-11-01`,
      tweet.fields: ['public_metrics'],
      max_results: 100,
    });

    let posts = 0;
    let impressions = 0;
    let engagements = 0;

    tweets.data?.forEach(tweet => {
      const m = tweet.public_metrics;
      if (m && m.impression_count > 0) {
        posts++;
        impressions += m.impression_count;
        engagements += m.like_count + m.retweet_count + m.quote_count;
      }
    });

    const er = impressions > 0 ? ((engagements / impressions) * 100).toFixed(1) : '0.0';

    let rank = 'Outside Top 5000';
    if (impressions > 150000) rank = 'Top 300';
    else if (impressions > 90000) rank = 'Top 500';
    else if (impressions > 55000) rank = 'Top 700';
    else if (impressions > 35000) rank = 'Top 1000';
    else if (impressions > 15000) rank = 'Top 2000';

    return NextResponse.json({
      username,
      posts,
      impressions: impressions.toLocaleString(),
      er: er + '%',
      estimatedRank: rank,
    });
  } catch (e: any) {
    return NextResponse.json({ error: 'Rate limit or API error' }, { status: 500 });
  }
}
