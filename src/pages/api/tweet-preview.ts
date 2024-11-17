import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  text?: string;
  image?: string | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // Check if id exists in query
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Tweet ID is required' });
    }

    // Verify Twitter API token exists
    const token = process.env.TWITTER_API_TOKEN;
    if (!token) {
      console.error('Twitter API token not configured');
      return res.status(500).json({ error: 'Twitter API configuration missing' });
    }

    // Make request to Twitter API
    const response = await fetch(
      `https://api.twitter.com/2/tweets/${id}?expansions=attachments.media_keys&media.fields=url,preview_image_url&tweet.fields=text`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Twitter API error:', errorText);
      return res.status(response.status).json({ 
        error: `Twitter API error: ${response.status}` 
      });
    }

    const data = await response.json();

    // Check if we have valid data
    if (!data.data) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    // Get media URL if it exists
    const mediaUrl = data.includes?.media?.[0]?.url || 
                    data.includes?.media?.[0]?.preview_image_url || 
                    null;

    // Return the tweet data
    return res.status(200).json({
      text: data.data.text,
      image: mediaUrl
    });

  } catch (error) {
    console.error('Tweet preview error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch tweet'
    });
  }
}
