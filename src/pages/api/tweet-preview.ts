import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Tweet ID is required' });
  }

  try {
    // Make sure you have your Twitter API token in .env.local
    if (!process.env.TWITTER_API_TOKEN) {
      throw new Error('Twitter API token is not configured');
    }

    const response = await fetch(
      `https://api.twitter.com/2/tweets/${id}?expansions=attachments.media_keys&media.fields=url,preview_image_url&tweet.fields=text,attachments`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Twitter API error:', await response.text());
      throw new Error(`Twitter API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Twitter API response:', data); // For debugging

    // Check if we have valid data
    if (!data.data) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    const mediaUrl = data.includes?.media?.[0]?.url || 
                    data.includes?.media?.[0]?.preview_image_url;

    return res.status(200).json({
      text: data.data.text,
      image: mediaUrl || null
    });
  } catch (error) {
    console.error('Tweet preview error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch tweet',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
