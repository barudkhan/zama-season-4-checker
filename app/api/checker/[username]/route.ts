export default async function handler(req, res) {
  const token = process.env.TWITTER_BEARER;
  const search = req.query.q;

  const r = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await r.json();
  res.status(200).json(data);
}
