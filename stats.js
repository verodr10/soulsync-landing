export default async function handler(req, res) {
  const API_KEY = process.env.ML_API_KEY;
  const GROUP_ID = process.env.ML_GROUP_ID;

  if (!API_KEY || !GROUP_ID) {
    return res.status(500).json({ error: 'Missing ML_API_KEY or ML_GROUP_ID' });
  }

  const isLegacy = API_KEY.startsWith('mlapi-');

  const url = isLegacy
    ? `https://api.mailerlite.com/api/v2/groups/${GROUP_ID}`
    : `https://connect.mailerlite.com/api/groups/${GROUP_ID}`;

  const headers = isLegacy
    ? { 'X-MailerLite-ApiKey': API_KEY, 'Content-Type': 'application/json' }
    : { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

  try {
    const r = await fetch(url, { headers });
    const data = await r.json();

    if (!r.ok) {
      console.error('MailerLite stats error:', data);
      return res.status(r.status).json({ error: data });
    }

    let count = 0;
    if (isLegacy) {
      count = data?.active ?? data?.total ?? 0;
    } else {
      count = data?.subscribers_count?.active ?? 0;
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ count });
  } catch (e) {
    console.error('Stats server error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
