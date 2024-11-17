import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/${id}?expansions=attachments.media_keys&media.fields=url`,
      {
        headers: {
          'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAANUbxAEAAAAAFkJMMkHTMTOfF%2F9MxB81n4Qw9yQ%3DCAAmlMi5vVYoNk48HLBeIaRbNHzV6HvLFKWiPxGmgOjO4rJVvo`
        }
      }
    );

    const data = await response.json();

    res.status(200).json({
      text: data.data.text,
      image: data.includes?.media?.[0]?.url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweet' });
  }
}
