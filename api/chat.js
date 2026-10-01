import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const messages = await sql`SELECT * FROM messages ORDER BY timestamp ASC LIMIT 100`;
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { username, text } = req.body;
    await sql`INSERT INTO messages (username, text) VALUES (${username}, ${text})`;
    return res.status(200).json({ success: true });
  }
}
