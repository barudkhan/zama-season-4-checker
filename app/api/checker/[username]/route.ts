import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const client = new TwitterApi(process.env.TWITTER_BEARER!);

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const username = params.username.toLowerCase();

  try {
    const tweets = await client.v2.searchRecent({
      query: `from:${username} #ZamaCreatorProgram since:2025-11-01`,
      'tweet.fields': ['public_metrics', 'created_at'],
      max_results: 100
    });

    let totalImpressions = 0;
    let totalEngagements = 0;
    let postCount = 0;

    if (tweets.data) {
      for (const tweet of tweets.data) {
        const metrics = tweet.public_metrics;
        if (metrics?.impression_count > 0) {
          totalImpressions += metrics.impression_count;
          totalEngagements += (metrics.like_count || 0) + (metrics.retweet_count || 0) + (metrics.quote_count || 0);
          postCount++;
        }
      }
    }

    if (postCount === 0) {
      return NextResponse.json({ error: 'No #ZamaCreatorProgram posts found since Nov 1' });
    }

    const er = totalImpressions > 0 ? ((totalEngagements / totalImpressions) * 100).toFixed(2) + '%' : '0.00%';

    let estimatedRank = 'Outside Top 5000';
    if (totalImpressions > 150000) estimatedRank = 'Top 300';
    else if (totalImpressions > 90000) estimatedRank = 'Top 500';
    else if (totalImpressions > 55000) estimatedRank = 'Top 700';
    else if (totalImpressions > 35000) estimatedRank = 'Top 1000';
    else if (totalImpressions > 15000) estimatedRank = 'Top 2000';
    else if (postCount > 10) estimatedRank = 'Top 3000+';

    return NextResponse.json({
      username: `@${username}`,
      posts: postCount,
      impressions: totalImpressions.toLocaleString(),
      er,
      estimatedRank,
      updatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'API error' });
  }
}
